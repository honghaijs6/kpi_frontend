
// HOOKS 
import detectForm from '../../../hook/before/detectform'; 

import React, { Component } from 'react';
import { Row, Col, FormGroup, Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,

} from 'reactstrap'; 

import ViewModal from '../../../components/ViewModal' ; 
 
export default class MyForm extends Component {

  constructor(props){
    super(props);

    this.state = {}

    this._onSubmit = this._onSubmit.bind(this);

  }

  _resetForm(){
    return {
      code:'',
      name:'',
      address:''
    }
  }

  _onSubmit(){
    
    const fields = ['code','name','address'];
    if(detectForm(fields,this.state)===''){
       
      this.props.model.axios(this.props.typeAction,this.state,(res)=>{
        if(res.name==='success' || res.name==='ok'){
          this.props.onSubmitForm(res);
        }
      })
    }

  }
  
  componentWillReceiveProps(newProps){
    
    const state = newProps.typeAction === 'post' ? this._resetForm() : newProps.data; 
    this.setState(state);

  }


  render() {
    return (
      <ViewModal isFooter={true} onSubmit={ this._onSubmit } {...this.props} onToggle={(isOPen)=>{ this.props.onToggle(isOPen) }} >
        <div className="view-modal-body">
            <FormGroup>
               <Row>
                  <Col md={4}>
                    <label> Mã Kho </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><InputGroupText>#</InputGroupText></InputGroupAddon>
                      <Input id="code" onChange={(e)=>{ this.setState({code:e.target.value}) }} defaultValue={ this.state.code }  />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <label> Kho </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><InputGroupText>@</InputGroupText></InputGroupAddon>
                      <Input id="name" onChange={(e)=>{ this.setState({name:e.target.value}) }} defaultValue={ this.state.name } />
                    </InputGroup>
                  </Col>
               </Row>
            </FormGroup>
            
            <FormGroup>
               <Row>
                  <Col md={10}>
                    <label> Địa chỉ </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><InputGroupText><i className="fa fa-map-marker"></i></InputGroupText></InputGroupAddon>
                      <Input id="address" onChange={(e)=>{ this.setState({address:e.target.value}) }} defaultValue={ this.state.address } />
                    </InputGroup>

                  </Col>
               </Row>
            </FormGroup>
            
        </div>     
      </ViewModal>
    );
  }
}

MyForm.defaultProps = {
  onToggle:()=>{},
  onSubmitForm:()=>{},
  typeAction:'post',
  data:{
    code:'',
    name:'',
    address:''
  }
}
