
import {PRODUCT_TYPE} from '../../../../config/product.conf';

// hook
import uploadPhoto from '../../../../hook/ultil/uploadPhoto';

import React, { Component } from 'react';
import {  Row, Col,  FormGroup, Input  } from 'reactstrap';

import CKEditor from "react-ckeditor-component";




import BenModal from '../../../../components/BenModal';
import InputNumeral from '../../../../components/InputNumeral';
import InputSuggest from '../../../../components/InputSuggest'; 





function FormRow1(props){

  const modal = props.modal;
  const data = modal.data ;
  
  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin sản phẩm  </h6>
      <Row>
          <Col md="2">
            <FormGroup>
              <label> Mã  <span className="text-danger">*</span></label>
              <Input  id="code" onChange={(e)=>{ modal.onChange('code',e.target.value) }} defaultValue={ data.code }  type="text"/>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <label> Tên sản phẩm  <span className="text-danger">*</span> </label>
              <Input id="name" defaultValue={ data.name } onChange={(e)=>{ modal.onChange('name',e.target.value) }}    type="text"/>
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label> Serial? </label>
              <Input id="is_serial" onChange={(e)=>{ modal.onChange('is_serial',e.target.value) }}  type="select">
                <option value={0}> Không </option>
                <option value={1}> Có </option>
              </Input>
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label> Danh mục </label>
              <Input id="categories_id" type="select">
                {
                  props.categories.map((item)=>{
                    return(
                      <option key={item.id} value={item.id}> { item.name } </option>
                    )
                  })
                }
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
             <FormGroup>
                <label> Nhà cung cấp </label>
                <InputSuggest id="supplier_codes" />  
                
             </FormGroup>
          </Col>

      </Row>

    </div>
  )
}

function FormRow2(props){

  const modal = props.modal;
  const data = modal.data ;

  let photo_url = data.photo ;
  photo_url = props.onAction === 'handleFile' ? props.photo.base64 : photo_url;

  return(
    <div style={{marginTop: -20}} className="row-form">

      <Row>
          <Col md="2">
            <FormGroup>
              <label> Giá nhà máy <span className="text-danger">*</span></label>
              {/*<Input  id="price_1"  defaultValue={ data.price_1 }  type="text"/> */}

              <InputNumeral onChange={(value)=>{ console.log(value); }} id="price_1"  defaultValue={ data.price_1 } />

            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label> Giá gốc  <span className="text-danger">*</span> </label>
              <InputNumeral id="price_2" defaultValue={ data.price_2 }   type="text"/>
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label>Giá ĐL </label>
              <InputNumeral id="price_3"  defaultValue={ data.price_3 }    type="text"/>

            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label>Giá lẻ </label>
              <InputNumeral id="price_4"  defaultValue={ data.price_4 }  type="text"/>
            </FormGroup>
          </Col>

          <Col md={2}>
             <FormGroup>
                <label> ĐVT </label>
                <Input id="unit" type="select">
                  {
                    props.units.map((item)=>{
                      return(
                        <option key={item.id} value={item.id} > { item.name } </option>
                      )
                    })
                  }
                </Input>
             </FormGroup>
          </Col>
          <Col md="2">
             <FormGroup>
                <label> Thuộc </label>
                <Input id="type" type="select">
                    {

                      Object.keys(PRODUCT_TYPE).map((item)=>{
                        return(
                          <option key={item} value={ item }> { PRODUCT_TYPE[item] } </option>
                        )
                      })

                    }


                </Input>
             </FormGroup>
          </Col>

      </Row>

      <Row style={{marginBottom: 10}}>
        <Col md={6}>
          <Row>
            <Col md={6}>
                <button className="btn btn-ubuntu" style={{
                    width: 90,height: 90
                  }}>
                    <i className="fa fa-upload" style={{fontSize: 20}}></i>
                    <Input id="photo" style={{width: 90,height: 90,position: 'absolute', top:0, left: 15, opacity: 0}} type="file"
                    onChange={ (e)=> { props.handleFile(e) } } ></Input>
                </button>
            </Col>
            <Col md={6}>
                <div style={{
                    width: 90,height: 90,
                    border:'1px dashed #aaa',

                  }}>
                    <img style={{maxHeight: 90,position: 'absolute'}} src={ photo_url } />
                </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  )
}



class MyForm extends Component {


  constructor(props){
    super(props);

    this.state = {
      contentState:null,
      updateContent:'Hello'
    }

    this.onChange = this.onChange.bind(this);

  }

  onChange(evt){

      var newContent = evt.editor.getData();

      this.setState({
        content: newContent
      })
  }


  render(){


    return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >

          <FormRow1 {...this.props} />
          <FormRow2 {...this.props} />

          <div>
            <CKEditor
              activeClass="p10"
              content={this.state.content}
              events={{

                "change": this.onChange
              }}
             />
          </div>

       </BenModal>
     )
  }
}

 export default MyForm;
