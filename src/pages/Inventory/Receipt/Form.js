import { WAREHOUSE_TRACKS, WAREHOUSE_RECEIPT } from '../../../config/app.config';

// HOOKS
import { isExisted, detectForm } from '../../../hook/before'; 


import React, { Component } from 'react';
import {  Row, Col, FormGroup,Label, Input, Table, Button, ButtonGroup  } from 'reactstrap';

import ViewModal from '../../../components/ViewModal'; 
import InputSuggestProduct from '../../../components/InputSuggestProduct' ; 

import SelectListModelCode from '../../../components/SelectListModelCode';
import SelectList from '../../../components/SelectList'; 


function Info(props){  

  
  
  return( 
    <div style={{padding:10,paddingTop:30,paddingRight:10}}>
        
        
        <FormGroup>
          <Label> Loại  <span className="text-red">*</span></Label>
          <SelectList id="track_code" onChange={(e)=>{ props.onChange('track_code',e.target.value)  }} rows={ WAREHOUSE_TRACKS['in'] } name="-- Chọn --" />

        </FormGroup>

        <FormGroup>
          <Label> Kho </Label>
          <SelectListModelCode id="warehouse_code" onChange={(e)=>{  props.onChange('warehouse_code',e.target.value) }} name="-- Chọn --" strModel="warehouses" />

        </FormGroup>
        
        <FormGroup>
          <Label> Trạng thái </Label>
          <SelectList rows={WAREHOUSE_RECEIPT} defaultValue={ 0 } onChange={(e)=>{ props.onChange('status',e.target.value) }} name="-- Chọn -- " />

        </FormGroup>
        <FormGroup>
          <Label> Ghi chú  </Label>
          <Input type="textarea" onChange={(e)=>{props.onChange('note',e.target.value)  }}  style={{height:100}} id="note" />
        </FormGroup>


    </div>

  )

}

function TableInfo(props){
    
  const grid = props.grid ; 
  
  

  
  return(

    <div style={{padding:'30px 10px'}}>

      <FormGroup>
        
        <Row>
          <Col md="9">
            <InputSuggestProduct   type="all" onSelected={(json)=>{ props.onSelectedProduct(json) }}    />
          </Col>
          <Col md="3">
            
          </Col>
        </Row>

        <Row className="mt-20">
          <Col md={12}>

            <Table className="product-board table vk-table">
              <thead>
                <tr>
                  { 
                    grid.colums.map((item,index)=>{
                      return(
                        <th key={index} style={{width:item.width}}>{ item.headerName } </th> 
                      )
                    })
                  }
                </tr>
              </thead>

              <tbody style={{height:420}}>

                {
                  props.cart.map((item)=>{
                    
                    const amount = parseInt(item.amount) ; 
                    const price = item.price;
                    const total = parseInt(price) * amount ;  
                    const totalWithVat = (total * (parseInt(props.vat) / 100)) + total ;
                    

                    return(
                      <tr key={item.id}>

                        <td style={{ width: grid['colums'][0]['width'] }}> { item.code } </td>
                        <td style={{width:grid['colums'][1]['width']}}> {item.name} </td>
                        
                        

                        <td style={{width:grid['colums'][2]['width']}}> { item.unit } </td>

                        <td style={{width:grid['colums'][3]['width']}}>
                            <Input type="number" 
                              onChange={(e)=>{ props.onCardChange({row_id:item.id,field:'amount',value:e.target.value}) }} 
                              min={1} max={1000000} 
                              defaultValue={ amount } 
                            />
                        </td>

                        <td style={{width:grid['colums'][4]['width']}}>
                          <button style={{width:24, height:24, borderRadius:'50%',border:0}} onClick={()=>{ props.onRemoveCard(item.id) }}  className="bg-green"><i className="fa fa-trash"></i></button>
                        </td>
                      </tr>
                    )
                  })
                }
               
              </tbody>
              <thead>
                <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][2]['width'] }}> Tổng cộng  </td>
                    <td style={{ width: grid['colums'][3]['width'] }} className="text-red"> <span style={{fontWeight:'500'}}> { props.total } </span> </td>
                    <td style={{ width: grid['colums'][4]['width'] }} >  </td>

                 </tr>
              </thead>
              
            </Table>
          </Col>
        </Row>
      </FormGroup>
    </div>
  )
}

export default class ReceiptForm extends Component {


  constructor(props){

          super(props);
          
          this.state = {
            
            warehouse_code:'',
            type:props.receiptType, // Loại phiếu
            track_code:'',
            status:0,
            cart:[],
            total:0,
            note:'',
            onSuccess:false
          }

          this.grid = {
              colums:[
                {headerName: "Mã",width:140},
                {headerName: "Sản phẩm", width:410},
                {headerName: "ĐVT", width:120},
                {headerName: "SL", width:90},
                {headerName: "", width:90}
              ]
          }

          
          this._onChangeReceiInfo = this._onChangeReceiInfo.bind(this);
          
          this._onChange = this._onChange.bind(this); 
          this._onSubmit = this._onSubmit.bind(this);


  }


  _onSubmit(){

          
        const fields = [
          'track_code','warehouse_code'
        ];
        
        if(detectForm(fields,this.state)===''){
          
          if(this.state.cart.length>0){
              /// ok submit post data ;

              const data = this.state ; 
              this.model.axios(this.props.typeAction,data,(res)=>{ 
                this._whereStateChange(res);               
              });

            
          }else{
              let el = document.querySelector("#form-err");
              el.innerHTML = '<span class="text-danger"><i class="fa fa-exclamation-triangle"></i>  Vui lòng chọn sản phẩm </span>';

          }
        }


        

  }

    
  _calculateSUM(cart){

        let ret = {
            total:0,
            total_sum:0,
            total_sum_vat:0,
            total_vat:0,
            promotion_discount:0
        };
        
        cart.map((item)=>{
          // calculate
          const amount = parseInt(item.amount) ; 
          ret.total += amount;

          // end calculate
        
        }) ;
        
        return ret;

  }

  _updateCard(json){ // row_id - field - value

        let cart = this.state.cart; 
        
        cart.map((item)=>{
          if(parseInt(json.row_id) === parseInt(item.id)){
            item[json.field] = json.value; 
          }
        });
        
        const retSUM = this._calculateSUM(cart);
        
        this.setState({
          cart:cart,
          ...retSUM
        });
        

  }

  _removeCard(id){

        let cart = this.state.cart ; 
        const newCart2 = cart.filter(item=>item.id !== id) ;

        const retSUM = this._calculateSUM(newCart2);

        this.setState({
          cart:newCart2,
          ...retSUM
        });
        

  }

  _addCard(json){


        if(!isExisted(this.state.cart,json.id)){

          let cart = this.state.cart;
            
          cart.push({
            id:json.id,
            code:json.code,
            name:json.name,
            unit:json.unit_name,
            is_serial:json.is_serial,
            images:json.images,
            type:json.type,
            amount:1,
            price:json.price_1
          }); 

          const retSUM = this._calculateSUM(cart);

          this.setState({
            cart:cart,
            ...retSUM
          });

                  
        }
        
        
  }

  _onChangeReceiInfo(field,value){

        let info = this.state.receiver_info;
        Object.assign(info,{
          [field]:value
        });
        
        this.setState({
            receiver_info:info
        });
        

  }

  _onChange(name,value){
        this.setState({ 
          [name]:value
        });
        
  } 

  async componentDidMount(){
        // INIT ORDERS MODEL
        this.model =  this.props.model;  
        
        
  }

  _whereStateChange(res){

        if(res.name==='success' || res.name ==='ok'){
          this.props.onSubmitForm(res.name);
        }
        
  }

  componentWillReceiveProps(newProps){

      this.setState({
        type:newProps.receiptType
      })      

  }
  render() {
    return (
      <ViewModal isFooter={true} onSubmit={ this._onSubmit } {...this.props}  onToggle={(isOpen)=>{this.props.onToggle(isOpen)  }} >
          <Row>
              <Col md={9} >
                  <TableInfo 
                      {...this.state} 
                      grid={this.grid}
                      onCardChange={ (json)=>this._updateCard(json) } 
                      onRemoveCard={(id)=>{ this._removeCard(id) }}  
                      onSelectedProduct={(json)=>{  this._addCard(json)  }} 
                  />
              </Col>
              <Col md={3} style={{background:'#f0f0f0',borderLeft:'1px solid #ddd'}}>

                  <Info {...this.state} 
                      onChange={this._onChange}  
                  />
                  
              </Col>
          </Row>
      </ViewModal>
    );
  }
}

ReceiptForm.defaultProps = {
  typeAction:'post',
  onToggle:()=>{},
  onSubmitForm:()=>{}
}

