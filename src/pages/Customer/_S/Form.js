import React, { Component } from 'react';
import {  Row, Col, Label,   FormGroup, Input    } from 'reactstrap';

import BenModal from '../../../components/BenModal';

import SelectListModelCode from '../../../components/SelectListModelCode' ; 
import SelectListModel from '../../../components/SelectListModel' ; 





function GeneralInfoRow(props){

  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin chung  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Mã KH </label>
              <Input  id="code"  type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> Công ty </label>
              <Input id="name" type="text"   />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Người liên hệ </label>
              <Input id="contact_name"  type="text"  />
            </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Số ĐT </label>
              <Input  id="phone"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> E-mail </label>
              <Input  id="email"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Mã số thuế </label>
              <Input id="tax_no"    type="text"/>
            </FormGroup>
          </Col>
      </Row>
    </div>
  )
}

function ContactInfoRow(props){
  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin Liên hệ  </h6>
      <Row>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ </label>
              <Input  id="address" type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Tỉnh / Thành </label>
              <SelectListModelCode id="region_code" strModel="regions" name="Vui lòng chọn" />

            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Quận / Huyện </label>
              <Input  id="subregion_code"    type="text"/>
            </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ giao hàng </label>
              <Input  id="address"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ xuất hoá đơn </label>
              <Input id="address_xhd"    type="text"/>
            </FormGroup>
          </Col>

      </Row>
    </div>
  )
}


function ClassifyInfoRow(props){
  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Phân loại khách hàng  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Nhóm KH </label>
              <SelectListModelCode id="type" strModel="customer_types" name="Vui lòng chọn" /> 


            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Cấp bậc </label>
              <SelectListModel strModel="levels" name="Vui lòng chọn" id="level_id" />
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              <label> Trạng thái KH </label>
              <SelectListModelCode strModel="customer_status" name="Vui lòng chọn" id="status_code" />

            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Nguồn </label>
              <SelectListModelCode strModel="customer_originals" name="Vui lòng chọn" id="status_code" />

            </FormGroup>
          </Col>
      </Row>

    </div>
  )
}


function OtherInfoRow(props){
  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin khác  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> NV Phụ trách </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Gán thẻ  </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label> Ghi chú </Label>
              <Input style={{ height:90}} type="textarea"   />
            </FormGroup>
          </Col>
      </Row>
    </div>
  )
}




class CustomerForm extends Component {

   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <div style={{padding:20}}>
            <GeneralInfoRow modal={ this.props.modal } />
            <ContactInfoRow modal={ this.props.modal } />
            <ClassifyInfoRow modal={ this.props.modal }  />
            <OtherInfoRow modal={ this.props.modal} />
          </div>
       </BenModal>
     )
   }
 }

 export default CustomerForm;
