
import React, { Component } from 'react';
import {  Row, Col, Label, FormGroup, Input, Button } from 'reactstrap';


import { MAU_PHIEUCHI } from '../../../config/temp-code';


import { AppSwitch } from '@coreui/react'


class BillDisplaySetting extends Component{

  constructor(props){
    super(props);
    this.state = {

      tab:'BillDisplaySetting'
    }
  }

  /* WHEN*/
  /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
  componentWillReceiveProps(newProps){

  }

  /* WHERE*/
  render(){


    return(

      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
          <div className="pa-30 need-scroll">
              <h5> Cấu Hình Phiếu  </h5>
              <p> Cấu hình liên quan đến tính năng sổ tiền </p>

              <div className="container pt-30 pb-30">
                <Row>
                   <Col md="3">
                     <Label> Tiêu đề mặc định khi tạo PHIẾU THU tự động từ đơn hàng  </Label>
                   </Col>

                   <Col md="6">
                     <FormGroup>

                       <Input type="text"  />
                     </FormGroup>
                   </Col>
                </Row>
                <Row>
                   <Col md="3">
                     <Label> Tiêu đề mặc định khi tạo PHIẾU CHI tự động từ đơn hàng mua </Label>
                   </Col>

                   <Col md="6">
                     <FormGroup>

                       <Input type="text"  />
                     </FormGroup>
                   </Col>
                </Row>

                <Row>
                   <Col md="3">
                     <Label> Cấm huỷ khi đã hoàn thành </Label>
                   </Col>

                   <Col md="6">
                     <FormGroup>
                       <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'}  checked={true} />

                     </FormGroup>
                   </Col>
                </Row>

                <Row style={{
                    paddingBottom:20
                  }}>
                   <Col md="12">
                       <Label> Mẫu PHIẾU CHI để IN  </Label>
                       <a className="pl-20 pull-right"> Xem trước </a>
                       <Input type="textarea" defaultValue={MAU_PHIEUCHI} style={{height:300}}  />
                        


                   </Col>


                </Row>

                <Row>
                   <Col md="12">
                      <Label> Mẫu PHIẾU THU để IN </Label>
                      <a className="pl-20 pull-right"> Xem trước </a>
                      <Input type="textarea" defaultValue={MAU_PHIEUCHI} style={{height:300}}  />
                      
                   </Col>

                </Row>

                <Row className="pt-30">
                  <Col md="12">
                    <Button size="lg" className="btn-ubuntu bg-green" style={{width:100}} > Lưu </Button>
                  </Col>
                </Row>

              </div>


          </div>
      </div>
    )

  }
}

export default BillDisplaySetting;
