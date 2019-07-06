
// HOOKS 
import doLoadAll from '../../../hook/ultil/doLoadAll';
import detechForm from '../../../hook/before/detectform';

import React, { Component } from 'react';
import ViewModal from '../../../components/ViewModal';
 
import { FormGroup, Input, Col } from 'reactstrap';
import Select from 'react-select';




class FormGroupUser extends Component {

    
    state={}

    _resetForm(){
        return {
            groupName:'',
            selectedUsers:[],
            users:[]
        }
    }
    async _loadUser(){
        const res = await doLoadAll('users');
        if(res.name==='success'){

            let users = [];
            res.rows.map((item)=>{
                
                users.push({
                    value:item.email,
                    label:item.name
                });

            });
            
            this.setState({
                users:users
            });
        }
    }

    _onSubmit = ()=>{
        //this.props.onSubmit
        //alert(JSON.stringify(this.state.selectedUsers));

        const fields = ['groupName'] ; 
        if(detechForm(fields,this.state) ===''){
            
            if(this.state.selectedUsers.length > 0){

                this.props.onSubmit(this.state);

            }else{  
                let el = document.querySelector("#form-err");
                el.innerHTML = 'Vui lòng gán nhân viên';

            }

        }


    }
    componentDidMount(){
        this._loadUser();
    }

    componentWillReceiveProps(newProps){
        if(newProps.typeAction==='post'){
            this.setState(this._resetForm)
        }else{
            // UPDATE MEMBERS 
        }
    }
    render() {
        const title = this.props.typeAction === 'post' ? 'Tạo nhóm mới' : 'Chỉnh sửa nhóm' 
        return (
            <ViewModal isFooter={true} name={title} {...this.props} onSubmit={ this._onSubmit } >
                <div className="view-modal-body"> 
                    <FormGroup row>
                        <Col>
                            <label> Nhóm </label>
                            <Input id="groupName" defaultValue={this.state.groupName} onChange={(e)=>{  this.setState({groupName:e.target.value})  }} type="text" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col> 
                            <label> Gán nhân viên </label>
                            <Select
                                
                                placeholder="Thêm người nhận"
                                isSearchable ={true}
                                isMulti ={true}
                                
                                onChange={(option)=>{ this.setState({ selectedUsers:option }) }} 
                                options={this.state.users}
                             />
                        </Col>
                    </FormGroup>
                </div>
            </ViewModal>
        );
    }
}

FormGroupUser.defaultProps= {
    typeAction:'post',
    onSubmit:()=>{}
}

export default FormGroupUser;