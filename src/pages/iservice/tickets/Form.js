import  detectForm from '../../../hook/before/detectform';
import { ISERVICE_TYPES } from '../../../config/app.config';

// LIBS 
import moment from 'moment';
import {myTime} from '../../../hook/ultil/myTime'


import React, { Component } from 'react';
import {  Row, Col, FormGroup, Input, ButtonGroup, Button  } from 'reactstrap';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



import SelectList from '../../../components/SelectList';
import InputSuggestOrder from '../../../components/InputSuggestOrder'
import InputSuggest from '../../../components/InputSuggest';

import SelectHour from '../../../components/SelectHour';
import SelectMinute from '../../../components/SelectMinute'; 



import ViewModal from '../../../components/ViewModal';


const FROM_OBJECTS = [
    {code:'inv_code',name:'Đơn hàng bán'},
    {code:'customer_code',name:'Khách hàng'}   
]


export default class MyForm extends Component {



    constructor(props){
        super(props);

        this.state = {

            code:'',
            customer_info:{
                name:'',
                address_delivery:'',
                phone:''
            },
            startDate: new Date( myTime.curDateEn() ),
            hour:0,
            minute:0
        }

        this._onChange = this._onChange.bind(this) ; 
        this._onSubmit = this._onSubmit.bind(this);
        


    }

    
    _onSubmit(){
        const fields = [
            'from_type','ref_code','belong_user','content_issue'
        ];
          
        if(detectForm(fields,this.state)===''){
            
            const date_arrived = moment(this.state.startDate).format('YYYY-MM-DD')  +' '+this.state.hour+':'+this.state.minute;
            let data = this.state ; 
            data.date_arrived = date_arrived;

            delete data.startDate;
            delete data.hour;
            delete data.minute;
            
            this.model.axios(this.props.typeAction,data,(res)=>{ 
                
                this._whereStateChange(res);               

            });

                    
        }

    }
    
    _onChange(name,value){
        this.setState({ 
          [name]:value
        });
        
    }



    _getTitle(){

        const type = this.props.receiptType === '' ? 'osv':this.props.receiptType; 
        
        return ISERVICE_TYPES[type]['name'] +' '+ this.state.code || '';

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

    
    _onChangeRefcodeCustomer(item){
        
        this.setState({
            ref_code:item.code,
            customer_info:{
                name:item.name,
                address_delivery:item.address,
                phone:item.phone
            }
        });

        
    }
    _onChangeRefcode(item){
        
        const cusInfo = JSON.parse(item.customer_info);
        
        this.setState({
            ref_code:item.code_pi,
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
        
        const refcode_name = FROM_OBJECTS.map((item)=>{  if(item.code===code){ return item.name } });
        
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

        if(JSON.stringify(newProps.data) !=='{}'){
            const data = newProps.data ;
            const cusInfo = JSON.parse(data.customer_info);

            const startDate = moment(data.date_arrived).format('YYYY-MM-DD');
            const hh = moment(data.date_arrived).format('HH');
            const mm = moment(data.date_arrived).format('mm');
            
            
            const state = {
                id:data.id,
                code:data.code,
                type:data.type, 
                from_type:data.from_type,
                ref_code:data.ref_code,
                refcode_name:'Đơn hàng bán',
                customer_code:data.customer_code,
                customer_info:cusInfo,
                content_issue:data.content_issue,
                belong_user:data.belong_user,
                startDate: new Date( startDate ),
                hour:hh,
                minute:mm

            }
            this.setState(state);

            
        }else{  
            let state = this._resetForm();
            state.type = newProps.receiptType;
            this.setState(state); 
        }


        

    }

    RefCode(from_type){

        const arr = {
            inv_code:<div>
                            <label> Mã chứng từ </label>
                            <InputSuggestOrder id="ref_code" onSelected={(item)=>{ this._onChangeRefcode(item) }} defaultValue={this.state.ref_code} />
                     </div>,
            customer_code:<div>
                        <label> Mã khách hàng </label>
                        <InputSuggest strModel="customers" onSelected={(item)=>{ this._onChangeRefcodeCustomer(item) }} id="ref_code" defaultValue={this.state.ref_code} />
                    </div>
         
        };
        return(
          arr[from_type]                     
        )
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
                                { this.RefCode(this.state.from_type) }
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
                            <Col md={4}>
                                <label> Lịch hẹn đến </label>
                                <div style={{'clear':'both'}}>
                                    <ButtonGroup>
                                        <Button style={{background:'#fff', borderRight:0}} disabled> <i className="fa fa-calendar"></i> </Button>
                                        <DatePicker
                                            onChange={(date)=>{ this.setState({startDate:date}) }}

                                            dateFormat="yyyy-MM-dd"
                                            selected={this.state.startDate}

                                            className="input-datepicker"
                                        />

                                        <SelectHour 
                                            onChange={(e)=>{ this.setState({hour:e.target.value}) }} 
                                            defaultValue={this.state.hour} 
                                            style={{borderRadius:0,borderLeft:0}}  
                                        />
                                        <SelectMinute 
                                            onChange={(e)=>{ this.setState({minute:e.target.value}) }} 
                                            defaultValue={this.state.minute} style={{borderRadius:0, borderLeft:0, width:120}} 
                                        />

                                    </ButtonGroup>
                                </div>



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
    onSubmitForm:()=>{},
    receiptType:'osv'
}

