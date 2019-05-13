
import Model from '../../../model/model';

import { isExisted, detectForm } from '../../../hook/before'; 

import React from 'react';
import { connect } from 'react-redux';

import {  Row, Col, FormGroup,Label, Input, Table, Button, ButtonGroup  } from 'reactstrap';
import { Redirect  } from 'react-router-dom'; 

import numeral from 'numeral';

import InputNumeral from '../../../components/InputNumeral'; 
import InputSuggest from '../../../components/InputSuggest';   
import InputSuggestProduct from '../../../components/InputSuggestProduct' ; 

import SelectListModelCode from '../../../components/SelectListModelCode';
import ButtonExpand from '../../../components/ButtonExpand'; 


import FormAddOn from './FormAddOn'; 
import { MAIN_COLOR } from '../../../config/app.config';


const MODE = 'orders';


function FrmLeft(props){

    const cusInfo = props.customer_info ; 
    
    return( 
      <div style={{padding:20, background:MAIN_COLOR,borderRadius:4}}>
          <h5 style={{color:'#fff'}} className="text-uppercase font-14">

            <Label >
             <i className="fa fa-user mr-5"></i> 
              KHÁCH HÀNG 
            </Label>
            <span className="float-right"> { cusInfo.type_name } </span>
                        
          </h5>

          <FormGroup>
            <Label> Mã KH </Label>
            
            <InputSuggest style={{border:0}} defaultValue={ cusInfo.code } onSelected={(json)=>{ props.onSelectedCustomer(json) }} strModel='customers' id="customer_code"  />
          </FormGroup>
  
          <FormGroup>
            <Label> Công ty </Label>
            <Input style={{border:0}} type="text" defaultValue={cusInfo.name} disabled   />
          </FormGroup>
  
          <FormGroup>
            <Row>
              <Col md="6">
                <Label> MST </Label>
                <Input style={{border:0}} disabled defaultValue={cusInfo.tax_no} type="text"   />
              </Col>
              <Col>
                <Label> Thuế VAT </Label>
                <Input style={{border:0}} type="number" min={0} max={50} defaultValue={ props.vat } onChange={(e)=>{ props.onChange('vat',e.target.value) }} id="vat"  />
              </Col>
            </Row>
          </FormGroup>

          <h5 className='text-uppercase' style={{marginTop:20,color:'#fff'}}>
            <label> <i className="fa fa-truck mr-5"></i>  Giao hàng  </label>
          </h5>
          <FormGroup>
            <label> 
                Địa chỉ giao hàng  
            </label>
            <Input style={{border:0}} type="text" defaultValue={ cusInfo.address_delivery}  />

          </FormGroup>

          <h5 className='text-uppercase' style={{marginTop:20,color:'#fff'}}>
            <label> <i className="fa fa-shield mr-5"></i>  Thanh toán  </label>
            <label className="float-right"> { cusInfo.level_code } </label>

          </h5>

          <FormGroup> 
            <Row>
              <Col md={6}>
                <Label> Hạn mức thanh toán </Label>
                <SelectListModelCode 
                    style={{border:0}}
                    strModel='payments' onChange={(e)=>{  props.onChange('payment_code',e.target.value)  }} 
                    defaultValue={props.payment_code} name="Vui Lòng Chọn" id="payment_code" />
              </Col>
              <Col md={6}>
                <Label> Được giảm % </Label>
                <Input style={{border:0}} type='text' defaultValue={ cusInfo.benefit_discount === null ? 0 : cusInfo.benefit_discount } disabled />
              </Col>
            </Row>
           
            
          </FormGroup>
          
          <FormGroup>
            <Label> Ghi chú  </Label>
            <Input type="textarea"  defaultValue={ props.note } onChange={(e)=>{  props.onChange('note',e.target.value)  }} style={{height:100,border:0}} id="note" />
          </FormGroup>
  
  
      </div>
  
    )
  
  }
  
  function FrmRight(props){
    
    const grid = props.grid ; 
    
    
    const cusInfo = props.customer_info;

    return(
      <div style={{paddingRight:20}}>
        
        <FormGroup>
          <Row>
            <Col md="4">
              <InputSuggestProduct  type="root" onSelected={(json)=>{ props.onSelectedProduct(json) }} defaultValue={props.main_code}   />
            </Col>
            <Col md="6">
              <ButtonGroup>
                <ButtonExpand width={720} name="SP Phụ" icon="fa-tags">
                    <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='none-root' />
                </ButtonExpand>
                <ButtonExpand width={720} name="Phần mềm" icon="fa-desktop">
                      <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='root-software' />
                </ButtonExpand>
                <ButtonExpand width={720} name="Dịch vụ" icon="fa-plus">
                    <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='root-service' />
                </ButtonExpand>
              </ButtonGroup>
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
                          
                          <td style={{ width:grid['colums'][2]['width'] }}>
                            <img style={{height:90,border:'1px solid #ddd'}} src={ item.images }  />
                          </td>

                          <td tyle={{ width:grid['colums'][3]['width'] }}> Cái </td>

                          <td style={{width:grid['colums'][4]['width']}}>
                              <Input type="number" 
                                onChange={(e)=>{ props.onCardChange({row_id:item.id,field:'amount',value:e.target.value}) }} 
                                min={1} max={1000000} 
                                defaultValue={ amount } 
                              />
                          </td>

                          <td style={{width:grid['colums'][5]['width']}}> 
                            <InputNumeral onChange={(value)=>{ props.onCardChange({row_id:item.id,field:'price',value:value}) }} defaultValue={price} />
                          </td>

                          <td style={{width:grid['colums'][6]['width']}} className="text-green"> { numeral(total).format('0,0') }  </td>
                          <td style={{width:grid['colums'][7]['width']}} className="text-danger" > { numeral(totalWithVat).format('0,0') }  </td>

                          <td style={{width:grid['colums'][8]['width']}}>
                            <Button onClick={()=>{ props.onRemoveCard(item.id) }}  className="btn-trio"><i className="fa fa-trash"></i></Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                 
                </tbody>
                
                <tfoot>

                  
                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}> { cusInfo.level_name } </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> <label> Giảm </label>  </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="text-green"> <label>  { numeral(props.level_discount).format('0,0')+' đ' } </label>  </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger">  </td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>
                  
                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> <label> Tổng cộng </label>  </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="text-green"> <label> { numeral(props.total_sum).format('0,0')+' đ' } </label>  </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger"> <label>  </label> </td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>

                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> <label className="text-danger"> Thuế { props.vat+'%' } </label>  </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="text-danger"> <label> { numeral(props.total_vat).format('0,0')+' đ' } </label>  </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger"> <label>  </label> </td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>

                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}> </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> <label> Thành tiền </label>  </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="text-green"> <label> { numeral(props.total_sum_vat).format('0,0')+' đ' } </label>  </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger">  </td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>


                  
                </tfoot>


              </Table>
            </Col>
          </Row>
        </FormGroup>
      </div>
    )
  }



/* 
cart : [] 
- id 
- code 
- name
- unit
- is_serial
- guran_month
- images
- content 
- type
- amount
- price

*/
class AddQuotation extends React.Component {


    constructor(props){
      super(props);
      
      this.state = {
        customer_code:'',
        customer_info:{},
        cart:[], 
        vat:10,
        payment_code:'',
        note:'',
        main_code:'',
        total_sum:0,
        total_vat:0,
        total_sum_vat:0,
        belong_user:'',
        level_discount:0,
        promotion_discount:0,
        onSuccess:false
      }

      this.grid = {
        colums:[
          {headerName: "Mã",width:100},
          {headerName: "Sản phẩm", width:250},
          {headerName: "Hình Ảnh",width:140},
          {headerName: "ĐVT", width:100},
          {headerName: "SL", width:100},
          {headerName: "Đơn giá", width:150},
          {headerName: "Thành tiền", width:150},
          {headerName: "+VAT", width:150},
          {headerName: "Actions", width:90}
        ]
      }

      

      
      this._addCard = this._addCard.bind(this);
      this._onChange = this._onChange.bind(this);
      this._onSelectedCustomer = this._onSelectedCustomer.bind(this) ; 
      
      this._onSubmit = this._onSubmit.bind(this);


    }

    _onSubmit(){

      
      const fields = [
        'customer_code','vat','payment_code',
      ];
      
      if(detectForm(fields,this.state)===''){
         if(this.state.cart.length>0){
            /// ok submit post data ;

            const data = this.state ; 
            const cusInfo = data.customer_info; 

            delete data.main_code; 
            data.customer_info = {
              id:cusInfo.id,
              code:cusInfo.code,
              name:cusInfo.name,
              contact_name:cusInfo.contact_name,
              phone:cusInfo.phone,
              level_code:cusInfo.level_code,
              customer_original:cusInfo.customer_original,
              customer_status:cusInfo.customer_status,
              ref_price:cusInfo.ref_price,
              type_name:cusInfo.type_name,
              tax_no:cusInfo.tax_no,
              city:cusInfo.city,
              belong_user:cusInfo.belong_user,
              benefit_discount:cusInfo.benefit_discount,
              discount_for:cusInfo.discount_for
            }
            
            this.model.axios('post',data,(res)=>{ 
              this._whereStateChange(res);               
            });
           
         }else{
            let el = document.querySelector("#form-err");
            el.innerHTML = '<span class="text-danger"><i class="fa fa-exclamation-triangle"></i>  Vui lòng chọn sản phẩm </span>';

         }
      }


      

    }
    _onSelectedCustomer(json){

      
      this.setState({
        customer_code:json.code,
        belong_user:json.belong_user,
        customer_info:json,
        cart:[],
        total_sum:0,
        total_vat:0,
        total_sum_vat:0,
        level_discount:0
      });
      
      
    }


    _calculateSUM(cart){

      let ret = {
        total_sum:0,
        total_sum_vat:0,
        total_vat:0,
        level_discount:0 ,
        promotion_discount:0
      };

      const benefit_discount = this.state.customer_info.benefit_discount === null ? 0 : parseInt(this.state.customer_info.benefit_discount) ;
      const discount_for = this.state.customer_info['discount_for'];

      let TOTAL_SUM_1 = 0 ;

      
      cart.map((item)=>{
        // calculate
        const amount = parseInt(item.amount) ; 
        const price = item.price;
        const total = parseInt(price) * amount ;  
        ret.total_sum += total;

        const totalWithVat = (total * (parseInt(this.state.vat) / 100)) + total ;
        ret.total_sum_vat += totalWithVat ;             
        // end calculate

        // PRODUCT TYPE 
        if(discount_for!=='all'){
          if(item.type===discount_for){
            const total_1 = parseInt(price) * amount ; 
            TOTAL_SUM_1 += total_1; 
            ret.level_discount = TOTAL_SUM_1 * ( benefit_discount / 100 );
            
          }
        }
        // END PRODUCT TYPE
      }) ;

      // SUMARY 
      ret.total_sum = ret.total_sum - ret.level_discount ; 
      ret.total_vat = ret.total_sum * ( parseInt(this.state.vat)/100 );

      ret.total_sum_vat = ret.total_sum + ret.total_vat;
      
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
        // LẤY GIÁ TỪ THÔNG TIN KHÁCHNG HÀNG 
        const price =  json['price_'+this.state.customer_info['ref_price']] || 0 ;   
        const main_code = json.type ==='root' ? json.code : this.state.main_code 
        
        cart.push({
          id:json.id,
          code:json.code,
          name:json.name,
          unit:json.unit_name,
          is_serial:json.is_serial,
          guran_month:json.guran_month,
          images:json.images,
          content:json.content,
          type:json.type,
          amount:1,
          price:price
        }); 

        const retSUM = this._calculateSUM(cart);

        this.setState({
          cart:cart,
          main_code:main_code,
          ...retSUM
        });

                
      }
      
      
    }

    _onChange(name,value){
       this.setState({
         [name]:value
       });
       
    } 

    componentWillReceiveProps(newProps){
      console.log(newProps); 
    }

    componentDidMount(){

      // INIT ORDERS MODEL
      this.model = new Model(MODE,this.props.dispatch);
      
    }

    _whereStateChange(res){

      if(res.name==='success' || res.name ==='ok'){
        this.setState({
          onSuccess:true
        });
      }
      
    }

    
    render() {
        
        return this.state.onSuccess === false ?  (
            <div className="animated fadeIn">
                <div className="ubuntu-app " style={{border:0, marginTop: 20}}>

                    <Row style={{padding:20}}>
                        <Col md={3}>
                            <FrmLeft {...this.state} onChange={this._onChange}  onSelectedCustomer={ this._onSelectedCustomer }  />
                        </Col>
                        <Col md={9}>

                            <FrmRight 
                                {...this.state} 
                                grid={this.grid}
                                
                                onCardChange={ (json)=>this._updateCard(json) } 
                                onRemoveCard={(id)=>{ this._removeCard(id) }}  
                                onSelectedProduct={(json)=>{  this._addCard(json)  }} 
                            />
                            
                            <Button style={{width:120}} onClick={ this._onSubmit } className="btn btn-lg btn-ubuntu-ok ">
                              <i className="fa  fa-chevron-circle-right mr-5"></i> Đồng Ý 
                            </Button>
                            <span className="ml-10 form-err" id="form-err"></span>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        ): <Redirect to="/order/_s"/>
    }
}

const mapStateToProps = (state) => {
  return {
    orders: state[MODE]
  }
}

export default connect(mapStateToProps)(AddQuotation);
