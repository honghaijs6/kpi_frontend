import React, { Component } from 'react';
import {  Row, Col,  FormGroup, Input  } from 'reactstrap';

import BenModal from '../../../../components/BenModal';

import SelectCity from '../../../../components/SelectCity';
import SelectDist from '../../../../components/SelectDist';





function FormRow1(props){

  const modal = props.modal;
  const data = modal.data ;

  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin sản phẩm  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Mã  <span className="text-danger">*</span></label>
              <Input  id="code" onChange={(e)=>{ modal.onChange('code',e) }} defaultValue={ data.code }  type="text"/>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <label> Tên hiển thị <span className="text-danger">*</span> </label>
              <Input defaultValue={ data.name } onChange={(e)=>{ modal.onChange('name',e) }}  id="name" placeholder=""    type="text"/>
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label> Serial? </label>
              <Input defaultValue={ data.dept } onChange={(e)=>{ modal.onChange('dept',e) }}  id="dept" min="0" max="100"     type="number"/>
            </FormGroup>
          </Col>

      </Row>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Loại hình cung cấp </label>
              <Input id="type" defaultValue={ data.type } onChange={(e)=>{ modal.onChange('type',e) }} type="select">
                <option value="product" > Sản phẩm </option>
                <option value="service" > Dịch vụ </option>
              </Input>

            </FormGroup>
          </Col>


          <Col md="6">
            <FormGroup>
              <label> Tên người liên hệ <span className="text-danger">*</span> </label>
              <Input  defaultValue={ data.contact_name }  onChange={(e)=>{ modal.onChange('contact_name',e) }} id="contact_name"    type="text"/>
            </FormGroup>
          </Col>
      </Row>



    </div>
  )
}


class MyForm extends Component {

   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >

          <FormRow1 {...this.props} />



       </BenModal>
     )
   }
 }

 export default MyForm;
