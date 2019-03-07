import React, { Component } from 'react';
import {  Row, Col,  FormGroup, Input  } from 'reactstrap';

import BenModal from '../../../../components/BenModal';

import SelectCity from '../../../../components/SelectCity';
import SelectDist from '../../../../components/SelectDist';





function BasicInfoRow(props){

  const modal = props.modal;
  const data = modal.data ;

  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin cơ bản  </h6>
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
              <label> Cho công nợ </label>
              <Input defaultValue={ data.dept } onChange={(e)=>{ modal.onChange('dept',e) }}  id="dept" min="0" max="100" defaultValue="0"    type="number"/>
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

function OtherInfoRow(props){

  const modal = props.modal ;
  const data = modal.data ;

  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin công ty  </h6>
      <Row>
          <Col md="4">
            <FormGroup>
              <label> Tên công ty <span className="text-danger">*</span> </label>
              <Input defaultValue={ data.company_name } onChange={(e)=>{ modal.onChange('company_name',e) }}  id="company_name"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Mã số thuế <span className="text-danger">*</span> </label>
              <Input defaultValue={ data.tax_no } id="tax_no"  onChange={(e)=>{ modal.onChange('tax_no',e) }}   type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> E-mail <span className="text-danger">*</span> </label>
              <Input defaultValue={data.email}  id="email"  onChange={(e)=>{ modal.onChange('email',e) }}  type="text"/>
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label> Số điện thoại <span className="text-danger">*</span> </label>
              <Input defaultValue={data.phone}  id="phone" onChange={(e)=>{ modal.onChange('phone',e) }}   type="text"/>
            </FormGroup>
          </Col>
      </Row>
      <Row>
        <Col md="4">
          <FormGroup>
            <label> Địa chỉ <span className="text-danger">*</span></label>
            <Input defaultValue={data.address} id="address" onChange={(e)=>{ modal.onChange('address',e) }}  type="text"/>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <label> Tỉnh / Thành </label>
            <SelectCity modal={ modal } regions={ props.regions} selected={ data.region_code} />

          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <label> Quận / huyện </label>
            <SelectDist subregions={ props.subregions } modal={ modal } selected={ data.subregion_code } />

          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md="7">
          <FormGroup>
            <label> Địa chỉ bảo hành </label>
            <Input defaultValue={data.address_2} id="address_2" onChange={(e)=>{ modal.onChange('address_2',e) }}  type="text"/>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md="7">
          <FormGroup>
            <label> Ghi chú </label>
            <Input defaultValue={data.note} id="note" onChange={(e)=>{ modal.onChange('note',e) }} style={{ height:90}} type="textarea"   />
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
          
          <BasicInfoRow {...this.props} />
          <OtherInfoRow {...this.props} />
          
       </BenModal>
     )
   }
 }

 export default MyForm;
