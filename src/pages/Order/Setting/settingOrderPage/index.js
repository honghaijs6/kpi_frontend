
// HOOKS 
import doGetModelInfo from '../../../../hook/ultil/doGetModelInfo';
import doUpdateModelInfo from '../../../../hook/ultil/doUpdateModelInfo'; 



import { MAU_QUOTATION, MAU_ORDER } from '../../../../config/temp-code'

import React, { Component } from 'react';
import {  Col, FormGroup, Input, Label, Button } from 'reactstrap';


import BenTabs from '../../../../components/BenTabs';
import PreviewForm from './PreviewForm';

class SettingOrderPage extends Component{

    
    constructor(props){
        super(props);

        this.state = {
            typeAction:'', // post - put - delete ...
            onAction:'', // string method
            status:'', // status
            
            tab:'settingOrderPage',
            isIniData:false,

            isOpenForm:false,
            type:'quotation_temp',
            quotation_temp: '' ,
            order_temp: '' ,
            
            companyInfo:{},
            onTab:'quotation',
            tabs:[
                { icon:'',code:'quotation',name:'Báo giá' },
                { icon:'',code:'order',name:'Đơn hàng' }
            ],

        }
    } 

    _previewForm = (type)=>{
        this.setState({
            type:type,
            isOpenForm:true
        });
    }

    async componentDidMount(){
        const info = await doGetModelInfo('companies',window.USERINFO.company_id);
        if(info.name==='success'){

            const data = info.data;
            
            this.setState({
                companyInfo:info.data,
                quotation_temp:data.quotation_temp || MAU_QUOTATION,
                order_temp:data.order_temp || MAU_ORDER,
                
            });

        }
    }

    async _onSubmit(field){
        // quotation_temp - order_temp
        const data = {
            id:this.state.companyInfo.id,
            [field]:this.state[field]
        }

        const res =  await doUpdateModelInfo('companies',data) ;


    }
    render(){

        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true } style={{background:'#E4E5E6' , height:'90vh' }}>
                <div style={{padding:20}}>
                    <h4 className="text-uppercase" style={{marginBottom:20}}> Cấu hình đơn hàng </h4>

                    <PreviewForm 
                        
                        name="Báo giá"
                        type={this.state.type}

                        width="72%"
                        isOpen={this.state.isOpenForm}
                        onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }} 

                        quotation_temp={ this.state.quotation_temp } 
                        order_temp={ this.state.order_temp } 


                        companyInfo={this.state.companyInfo}
                    />
                    <BenTabs 
                        onChangeTab={(code)=>{ this.setState({onTab:code}) }} 
                        tabs={ this.state.tabs }
                    >
                        {/* TAB QUOTATION */}
                        <div className={  `tab-pane  ${ this.state.onTab==='quotation'?'active':'' } ` }>
                            
                            <FormGroup row>
                                <Col md={12}>
                                    <Label> Mẫu hiển thị báo giá </Label>
                                    <span style={{cursor:'pointer'}} onClick={()=>{ this._previewForm('quotation_temp') }} className="txt-green pull-right">  Xem trước </span>
                                    <div style={{marginTop:10}}>
                                        <Input 
                                            onChange={(e)=>{ this.setState({quotation_temp:e.target.value}) }}    
                                            value={ this.state.quotation_temp }
                                            type="textarea" style={{
                                            height:400
                                        }} />
                                    </div>

                                </Col>
                                
                            </FormGroup>
                            <FormGroup row style={{marginTop:40}}>
                                <Col md={12}>
                                    <Button onClick={ ()=>{ this._onSubmit('quotation_temp') } } className="btn btn-ubuntu bg-green"> 
                                        <i className="fa  fa-chevron-circle-right mr-5"></i> Cập nhật 
                                    </Button>        
                                    <span className="form-err text-red" id="form-err"></span>
                                </Col>
                            </FormGroup>
                        </div>

                        {/* END QUOTATION */}

                        {/* TAB ORDER */}
                        <div className={  `tab-pane  ${ this.state.onTab==='order'?'active':'' } ` }>
                            <FormGroup row>
                                <Col md={12}>
                                    <Label> Mẫu hiển thị Đơn hàng </Label>
                                    <span style={{cursor:'pointer'}} onClick={()=>{ this._previewForm('order_temp') }} className="txt-green pull-right">  Xem trước </span>
                                    <div style={{marginTop:10}}>
                                        <Input 
                                            onChange={(e)=>{ this.setState({order_temp:e.target.value}) }}    
                                            value={ this.state.quotation_temp }
                                            type="textarea" style={{
                                            height:400
                                        }} />
                                    </div>

                                </Col>
                                
                            </FormGroup>
                            <FormGroup row style={{marginTop:40}}>
                                <Col md={12}>
                                    <Button onClick={ ()=>{ this._onSubmit('order_temp') } } className="btn btn-ubuntu bg-green"> 
                                        <i className="fa  fa-chevron-circle-right mr-5"></i> Cập nhật 
                                    </Button>        
                                    <span className="form-err text-red" id="form-err"></span>
                                </Col>
                            </FormGroup>
                        </div>

                        {/* END ORDER */}
                        


                    </BenTabs>
                </div>
            </div>
        )
    }
}

export default SettingOrderPage; 