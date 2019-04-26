import { isExisted } from '../../../hook/before'; 

import React from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Table, Button, ButtonGroup  } from 'reactstrap';
import BenModal from '../../../components/BenModal';

import numeral from 'numeral';

import InputNumeral from '../../../components/InputNumeral'; 
import InputSuggest from '../../../components/InputSuggest'; 
import SelectListModel from '../../../components/SelectListModel'; 
 


function FrmLeft(props){

    return(
      <div>
          <h5 className="txt-green text-uppercase font-14 mb-20"><i className="fa fa-user mr-5"></i> Thông tin Khách hàng </h5>
  
          <FormGroup>
            <Label> Mã KH </Label>
            <InputSuggest onSelected={(json)=>{ props.onSelectedCustomer(json) }} strModel='customers' id="customer_id"  />
          </FormGroup>
  
          <FormGroup>
            <Label> Công ty </Label>
            <Input type="text" defaultValue={props.customer_info.name} disabled   />
          </FormGroup>
  
          <FormGroup>
            <Row>
              <Col md="6">
                <Label> MST </Label>
                <Input disabled defaultValue={props.customer_info.tax_no} type="text"   />
              </Col>
              <Col>
                <Label> Thuế VAT </Label>
                <Input type="number" min={0} max={50} defaultValue={10} onChange={(e)=>{ props.onChange('vat',e.target.value) }} id="vat"  />
              </Col>
            </Row>
          </FormGroup>
  
          <FormGroup>
            <Label>Hạn mức thanh toán </Label>
            <SelectListModel strModel='payments' name="Vui Lòng Chọn" />

            
            </FormGroup>
  
          <FormGroup>
            <Label> Ghi chú  </Label>
            <Input type="textarea" style={{height:100}} id="note" />
          </FormGroup>
  
  
      </div>
  
    )
  
  }
  
  function FrmRight(props){
  
    return(
      <div>
        <h5 className="txt-green text-uppercase font-14 mb-20"> <i className="fa fa-file-text mr-5"></i> Báo giá cho : { props.customer_info.name } </h5>
        <FormGroup>
          <Row>
            <Col md="4">
              <Label> Sản phẩm chính </Label>
              <InputSuggest strModel='products' onSelected={(json)=>{ props.onSelectedProduct(json) }}   />
            </Col>
            <Col md="2">
              <Label> Sản phẩm phụ </Label>
              <div>
                <a style={{width:'100%'}} className="btn btn-ubuntu bg-grey"> <i className="fa fa-plus"></i> Thêm</a>
              </div>
            </Col>
  
            <Col md="2">
              <Label> Dịch vụ </Label>
              <div>
                <a style={{width:'100%'}} className="btn btn-ubuntu bg-grey"> <i className="fa fa-plus"></i> Thêm</a>
              </div>
            </Col>
  
            <Col md="2">
              <Label> Phần mềm </Label>
              <div>
                <a style={{width:'100%'}} className="btn btn-ubuntu bg-grey"> <i className="fa fa-plus"></i> Thêm</a>
              </div>
            </Col>
  
            <Col md="2">
              <Label> Áp dụng khuyến mãi </Label>
              <Input type="select">
                  <option> Không chọn </option>
              </Input>
            </Col>
  
  
          </Row>
  
          <Row className="mt-20" style={{height:'55vh',overflow:'auto'}}>
            <Col md={12}>
  
              <Table striped className="product-board">
                <thead style={{ border:0, background:'#222D32', color:'#fff' }} >
                  <tr>
                    <th style={{width:60}}>STT</th>
                    <th style={{ width:150 }}> Mã </th>
                    <th style={{width:410}}> Sản phẩm </th>
                    <th style={{ width:150 }}> Ảnh </th>
                    <th tyle={{ width:90 }}> ĐVT </th>
                    <th style={{width:90}}> SL  </th>
                    <th style={{width:120}}> Đơn giá  </th>
                    <th style={{width:120}}> T.T  </th>
                    <th style={{width:120}}> +VAT  </th>
                    <th style={{width:90}}>   </th>
  
                  </tr>
                </thead>
  
                <tbody>

                  {
                    props.cart.map((item)=>{
                      
                      const amount = 1 ; 
                      const price = item.price_1;
                      const total = parseInt(price) * amount ; 
                      const totalWithVat = 0 ;

                      return(
                        <tr key={item.id}>
                          <td style={{width:60}}>1</td>
                          <td style={{ width:100 }}> { item.code } </td>
                          <td style={{width:330}}> {item.name} </td>
                          <td style={{ width:150 }}>
                            <img style={{height:90,border:'1px solid #ddd'}} src={ item.images }  />
                          </td>
                          <td tyle={{ width:90 }}> Cái </td>
                          <td style={{width:120}}>
                              <Input type="number" min={1} max={1000} defaultValue={1} />
                          </td>
                          <td style={{width:150}}> 
                            <InputNumeral onChange={(value)=>{ props.onCardChange({row_id:item.id,field:'price',value:value}) }} defaultValue={price} />
                          </td>
                          <td style={{width:150}}> { numeral(total).format('0,0') }  </td>
                          <td style={{width:130}}> { totalWithVat }  </td>
                          <td style={{width:130}}>
                            <Button onClick={()=>{ props.onRemoveCard(item.id) }}  className="btn-trio"><i className="fa fa-trash"></i></Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                  
  
                </tbody>
  
                <tfoot>
                  <tr>
                    <td></td>
                    <td>  </td>
                    <td>  </td>
                    <td>  </td>
                    <td>  </td>
                    <td>   </td>
                    <td>  Tổng tiền  </td>
                    <td> 200.000  </td>
                    <td>   </td>
                    <td>   </td>
                  </tr>
                </tfoot>
  
              </Table>
            </Col>
          </Row>
        </FormGroup>
      </div>
    )
  }


class AddQuotation extends React.Component {


    constructor(props){
      super(props);

      this.state = {
        customer_info:{},
        cart:[],
        vat:10,
        payment_code:'',
        note:''
      }

      this._calculateCart = this._calculateCart.bind(this) ; 
      this._addCard = this._addCard.bind(this);
      this._onChange = this._onChange.bind(this);
      this._onSelectedCustomer = this._onSelectedCustomer.bind(this) ; 

    }

    _onSelectedCustomer(json){
      this.setState({
        customer_info:json
      });
    }

    _calculateCart(json){
      //console.log()
      //alert(JSON.stringify(json));
      console.log(this.state.cart);
      
    }
    _updateCard(){

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
        cart.push(json); 

        this.setState({
          cart:cart
        });
        
      }
      
      
    }

    _onChange(name,value){
       this.setState({
         [name]:value
       });
       
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
                                onCardChange={ this._calculateCart } 
                                onRemoveCard={(id)=>{ this._removeCard(id) }}  
                                onSelectedProduct={(json)=>{  this._addCard(json)  }} 
                            />
                            
                            <Button style={{width:120}} onClick={()=>{ alert(this.state.vat) }} className="btn btn-lg btn-ubuntu "> Đồng Ý </Button>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        );
    }
}


export default AddQuotation;
