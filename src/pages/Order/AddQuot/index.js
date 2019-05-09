
import Model from '../../../model/model';

import { isExisted, detectForm } from '../../../hook/before'; 

import React from 'react';
import { connect } from 'react-redux';

import {  Row, Col, FormGroup,Label, Input, Table, Button, ButtonGroup  } from 'reactstrap';

import numeral from 'numeral';

import InputNumeral from '../../../components/InputNumeral'; 
import InputSuggest from '../../../components/InputSuggest';   
import InputSuggestProduct from '../../../components/InputSuggestProduct' ; 

import SelectListModelCode from '../../../components/SelectListModelCode';
import ButtonExpand from '../../../components/ButtonExpand'; 


import FormAddOn from './FormAddOn'; 


const MODE = 'orders';


function FrmLeft(props){

    const cusInfo = props.customer_info ; 

    return( 
      <div>
          <h5 className="txt-green text-uppercase font-14 mb-20">
            <Label style={{color:props.customer_info['color_code']}}>
             <i className="fa fa-user mr-5"></i> 
              Thông tin Khách hàng 
            </Label>

          
          </h5>

          <FormGroup>
            <Label> Mã KH </Label>
            <InputSuggest defaultValue={ cusInfo.code } onSelected={(json)=>{ props.onSelectedCustomer(json) }} strModel='customers' id="customer_code"  />
          </FormGroup>
  
          <FormGroup>
            <Label> Công ty </Label>
            <Input type="text" defaultValue={cusInfo.name} disabled   />
          </FormGroup>
  
          <FormGroup>
            <Row>
              <Col md="6">
                <Label> MST </Label>
                <Input disabled defaultValue={cusInfo.tax_no} type="text"   />
              </Col>
              <Col>
                <Label> Thuế VAT </Label>
                <Input type="number" min={0} max={50} defaultValue={ props.vat } onChange={(e)=>{ props.onChange('vat',e.target.value) }} id="vat"  />
              </Col>
            </Row>
          </FormGroup>
  
          <FormGroup>
            <Label>Hạn mức thanh toán </Label>
            <SelectListModelCode 
                strModel='payments' onChange={(e)=>{  props.onChange('payment_code',e.target.value)  }} 
                defaultValue={props.payment_code} name="Vui Lòng Chọn" id="payment_code" />
            
            </FormGroup>
  
          <FormGroup>
            <Label> Ghi chú  </Label>
            <Input type="textarea" defaultValue={ props.note } onChange={(e)=>{  props.onChange('note',e.target.value)  }} style={{height:100}} id="note" />
          </FormGroup>
  
  
      </div>
  
    )
  
  }
  
  function FrmRight(props){
    
    const grid = props.grid ; 
    
    let SUM = 0 
    let SUM_VAT = 0 ;


    return(
      <div>
        <h5 className="txt-green text-uppercase font-14 mb-20"> 

          <Label style={{color:props.customer_info['color_code']}}>
            <i className="fa fa-file-text mr-5"></i> Báo giá cho : { props.customer_info.name } 
          </Label>

          <Label style={{color:props.customer_info['color_code']}} className="float-right"> { props.customer_info.type_name } </Label>
          
        </h5>
        <FormGroup>
          <Row>
            <Col md="4">
              <Label> Sản phẩm chính </Label>
              <InputSuggestProduct  type="root" onSelected={(json)=>{ props.onSelectedProduct(json) }} defaultValue={props.main_code}   />
            </Col>
            <Col md="2">
              
              <Label> Sản phẩm phụ </Label>
                <div>
                  <ButtonGroup>
                    <ButtonExpand style={{width:150, borderRadius:0}} width={720} name="Thêm" icon="fa-plus">
                        <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='none-root' />
                    </ButtonExpand>
                  </ButtonGroup>
              </div>

              
              
            </Col>

            <Col md="2">
              <Label> Phần mềm </Label>
              <div>
                <ButtonGroup>
                  <ButtonExpand style={{width:150, borderRadius:0}} width={720} name="Thêm" icon="fa-plus">
                      <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='root-software' />
                  </ButtonExpand>
                </ButtonGroup>
                
              </div>
            </Col>

            <Col md="2">
              <Label> Dịch vụ </Label>
              <div>
                <ButtonGroup>
                  <ButtonExpand style={{width:150, borderRadius:0}} width={720} name="Thêm" icon="fa-plus">
                    <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='root-service' />
                  </ButtonExpand>
                </ButtonGroup>
              </div>
            </Col>
  
            
  
            <Col md="2">
              <Label> Áp dụng khuyến mãi </Label>
              <Input type="select">
                  <option> Không chọn </option>
              </Input>
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
                      SUM += total;

                      const totalWithVat = (total * (parseInt(props.vat) / 100)) + total ;
                      SUM_VAT += totalWithVat ; 

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
                    <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> <label> Tổng cộng </label>  </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="text-green"> <label> { numeral(SUM).format('0,0')+' đ' } </label>  </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger"> <label> { numeral(SUM_VAT).format('0,0')+' đ' } </label> </td>
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
        main_code:''
      }

      this.grid = {
        colums:[
          {headerName: "Mã",width:120},
          {headerName: "Sản phẩm", width:240},
          {headerName: "Hình Ảnh",width:140},
          {headerName: "ĐVT", width:140},
          {headerName: "SL", width:90},
          {headerName: "Đơn giá", width:140},
          {headerName: "Thành tiền", width:140},
          {headerName: "+VAT", width:140},
          {headerName: "Actions", width:140}
        ]
      }

      this._calculateCart = this._calculateCart.bind(this) ; 
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
              level_code:cusInfo.level_code,
              customer_original:cusInfo.customer_original,
              customer_status:cusInfo.customer_status,
              ref_price:cusInfo.ref_price,
              type_name:cusInfo.type_name,
              tax_no:cusInfo.tax_no,
              city:cusInfo.city
            }
            
            this.model.axios('post',data,(res)=>{ 
            
              if(res.name==='success' || res.name ==='ok'){
                alert(' thành công ');

              }
              
           })
           
         }else{
            let el = document.querySelector("#form-err");
            el.innerHTML = '<span class="text-danger"><i class="fa fa-exclamation-triangle"></i>  Vui lòng chọn sản phẩm </span>';

         }
      }


      

    }
    _onSelectedCustomer(json){
      this.setState({
        customer_code:json.code,
        customer_info:json
      });
    }

    _calculateCart(json){
      
      this._updateCard(json)
      
    }
    _updateCard(json){ // row_id - field - value

      let cart = this.state.cart; 

      cart.map((item)=>{
        if(parseInt(json.row_id) === parseInt(item.id)){
          item[json.field] = json.value
        }
      });

      this.setState({
        cart:cart
      })


    }
    _removeCard(id){
      let cart = this.state.cart ; 
      const newCart2 = cart.filter(item=>item.id !== id) ;

      this.setState({
        cart:newCart2
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

        this.setState({
          cart:cart,
          main_code:main_code
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
      this.model = new Model(MODE);
        

    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="ubuntu-app " style={{border:0, marginTop: 20}}>

                    <Row style={{padding:40}}>
                        <Col md={3}>
                            <FrmLeft {...this.state} onChange={this._onChange}  onSelectedCustomer={ this._onSelectedCustomer }  />
                        </Col>
                        <Col md={9}>

                            <FrmRight 
                                {...this.state} 
                                grid={this.grid}
                                
                                onCardChange={ this._calculateCart } 
                                onRemoveCard={(id)=>{ this._removeCard(id) }}  
                                onSelectedProduct={(json)=>{  this._addCard(json)  }} 
                            />
                            
                            <Button style={{width:120}} onClick={ this._onSubmit } className="btn btn-lg btn-ubuntu "> Đồng Ý </Button>
                            <span className="ml-10 form-err" id="form-err"></span>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    orders: state[MODE]
  }
}

export default AddQuotation;
