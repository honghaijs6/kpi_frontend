import  detectForm from '../../../hook/before/detectform';

import { ISERVICE_TYPES } from '../../../config/app.config';
 

import React, { Component } from 'react';
import {  Row, Col, FormGroup, Input  } from 'reactstrap';

import SelectList from '../../../components/SelectList';
import SelectListModel from '../../../components/SelectListModel';

import InputSuggestOrder from '../../../components/InputSuggestOrder'
import InputSuggest from '../../../components/InputSuggest'


import ViewModal from '../../../components/ViewModal';


const FROM_OBJECTS = [
    {code:'inv_code',name:'Đơn hàng bán'},
    {code:'customer_code',name:'Khách hàng'}   
]


export default class MyForm extends Component {



    constructor(props){
        super(props);

        this.state = {

            customer_info:{
                name:'',
                address_delivery:'',
                phone:''
            }
        }

        this._onChange = this._onChange.bind(this) ; 
        this._onSubmit = this._onSubmit.bind(this);

    }

    _onSubmit(){
        const fields = [
            'from_type','ref_code','customer_code','belong_user','content_issue'
        ];
          
        if(detectForm(fields,this.state)===''){

            alert(JSON.stringify(this.state));
            
            /*const data = this.state ; 
            this.model.axios(this.props.typeAction,data,(res)=>{ 
                this._whereStateChange(res);               
            });*/

        }

    }
    
    _onChange(name,value){
        this.setState({ 
          [name]:value
        });
        
    }



    _getTitle(){

        
        return ISERVICE_TYPES[this.props.receiptType];
    }

    _resetForm(){


        return {
            type:this.props.receiptType, 
            from_type:'inv_code',
            ref_code:'',
            refcode_name:'Đơn hàng bán',
            customer_code:'',
            customer_info:{
                name:'',
                address_delivery:'',
                phone:''
            },
            content_issue:'',
            belong_user:'',

          
        }
    }

    
    _onChangeRefcode(item){
        const cusInfo = JSON.parse(item.customer_info);
        
        this.setState({
            customer_info:cusInfo
        });

    }
    _onCustomerChange(name,value){
        let cusInfo = this.state.customer_info;
        cusInfo[name] = value;

        this.setState({
            customer_info:cusInfo
        })
    }

    _onObjectChange(code){
        
        const refcode_name = FROM_OBJECTS.map((item)=>{  if(item.code===code){ return item.name } })
        
        this.setState({
            refcode_name:refcode_name,
            from_type:code
        });



    }
    async componentDidMount(){
        // INIT ORDERS MODEL
        this.model =  this.props.model;  
        
        
    }

    _whereStateChange(res){

        if(res.name==='success' || res.name ==='ok'){
          this.props.onSubmitForm(res);
        }
        
    }

    componentWillReceiveProps(newProps){


        let state = this._resetForm();
        state.type = newProps.receiptType;
        this.setState(state); 

    }
    render() {

        const title = this._getTitle();
        const cusInfo = this.state.customer_info ; 

        
        return (
            
            <ViewModal name={title}  isFooter={true} {...this.props} onSubmit={this._onSubmit}  onToggle={(isOpen)=>{ this.props.onToggle(isOpen) }}>
                <div className="view-modal-body">
                    <FormGroup>
                        <Row>
                            <Col md={4}>
                                <label> Phiếu theo </label>
                                <SelectList 

                                    onChange={(e)=>{ this._onObjectChange(e.target.value) }} 
                                    defaultValue={ this.state.from_type } id="from_type" name="Vui lòng chọn"
                                    rows={ FROM_OBJECTS } 
                                />
                            </Col>
                            <Col md={4}>
                                <label> Mã chứng từ </label>
                                <InputSuggestOrder id="ref_code" onSelected={(item)=>{ this._onChangeRefcode(item) }} defaultValue={this.state.ref_code} />
                            
                            </Col>
                            
                            <Col>
                                <label> Người phụ trách </label>
                                <InputSuggest  
                                
                                    strModel='users' 
                                    code="username" 
                                    onSelected={(value)=>{ this._onChange('belong_user',value.username) }} defaultValue={ this.state.belong_user }  
                                    id="belong_user"  
                                />
                                

                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={4}>
                                <label> Tên Khách hàng </label>
                                <Input 
                                    defaultValue={ cusInfo['name'] } 
                                    type="text" 
                                    onChange={(e)=>{ this._onCustomerChange('name',e.target.value) }}
                                />
                            </Col>
                            <Col md={4}>
                                <label> SĐT </label>
                                <Input 
                                    type="text" 
                                    onChange={(e)=>{ this._onCustomerChange('phone',e.target.value) }}
                                    defaultValue={cusInfo['phone']}    
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop:15}}>
                            <Col md={8}>
                                <label> Địa chỉ </label>
                                <Input 
                                    onChange={(e)=>{ this._onCustomerChange('address_delivery',e.target.value) }}
                                    type="text" 
                                    defaultValue={cusInfo['address_delivery']}

                                />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col md={8}>
                                <label> Mô tả vấn đề </label>
                                <Input 
                                    id="content_issue"
                                    onChange={(e)=>{ this._onChange('content_issue',e.target.value) }} 
                                    defaultValue={this.state.content_issue} type="textarea" style={{height:120}} 
                                />
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
    onSubmitForm:()=>{}
}

