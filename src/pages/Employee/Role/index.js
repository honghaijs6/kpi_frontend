
import Model from '../../../model/model'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {   Table  } from 'reactstrap';

import { AppSwitch } from '@coreui/react';


const MODE = 'roles';
const MODE_NAME = 'Vai trò';

const MODE_USER_ROLES = 'user_roles';

class Role extends Component {

    _isInitData = false;
    _curInfo = {};

    constructor(props){
        super(props);

        this.state = {
            typeAction:'',  
            onAction:'',
            status:'',

            isOpenForm:false,
            tab:'role',
            userRoles:[]
        }

        this.grid = {
            colums:[
              { headerName:"STT",field:"stt",width:'50px' },
              { headerName:"SID",field:"id",width:'50px'},
              { headerName: "Mã",field:"code",width:'140px'},
              { headerName:" Tính năng ",field:"name", width:'240px'},
              { headerName: "Root Admin",field:"admin", width:'140px'}
              
            ],
            rowData:[]
        }



        this._setup();

        this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this); 
        this._doOpenModalPost = this._doOpenModalPost.bind(this);

    }


    _setup(){
        this.model = new Model(MODE,this.props.dispatch);
        this.moUseRoles = new Model(MODE_USER_ROLES);
        
        // SETUP FOR GET ALL RECORD HERE 
        this.model.set('paginate',{
            offset:0,
            p:0,
            max:'all',
            sort_by:'code', 
            sort_type:'asc' 
        });
        

    }

    _detectRoles(group_id,role_id){
        console.log(role_id);

        let rets = [];
        this.state.userRoles.map((rows)=>{
            rows.map((item2)=>{
                if(parseInt(item2.group_user_id) === parseInt(group_id)){
                    rets.push(item2);
                }
            })
        });

        let ret = false;
        rets.map((item)=>{
            if(parseInt(item.role_id) === parseInt(role_id)){
                ret = true;
            }
        })
        
        return ret;
    }
    _loadUserRoles(){

        const url = '/listAll/all';

        this.moUseRoles.doCall(url,(res)=>{
            const data = res.data;
            if(data.name==='success'){

                const rows = data.rows;

                const object = {};
                const result = [];
                const newArr = []

                // GET DUPLICATED GROUP_USER ID ;
                rows.map((item)=>{
                    if(!object[item.group_user_id]){
                        object[item.group_user_id] = 0;
                    }
                    object[item.group_user_id] +=1 ;
                });
                Object.keys(object).map((item)=>{
                    if(object[item]>=1){
                        result.push(item);
                    }
                });


                result.map((item)=>{
                    let arr = [];
                    rows.map((item2)=>{
                        if(parseInt(item)===parseInt(item2.group_user_id)){
                            arr.push(item2);
                        }
                    
                    });
                    newArr.push(arr);
                });

                this._fixColumRoles(newArr);

                this.setState({
                    userRoles:newArr
                });
                

            }
        })        
    }
    _doOpenModalUpdate(data){

        this._curInfo = data ; 
        this.setState({
            isOpenForm:true,
            typeAction:'put'
        });
    }
    _doOpenModalPost(){
        
        this.setState({
            isOpenForm:true,
            typeAction:'post'
        });
    }

    _onSubmitForm(res){
        if(res.name==='success' || res.name==='ok'){

            this._curInfo = {}
            
            this.setState({
                isOpenForm:false,
                typeAction:'',
                receiptType:'',
                status:res.name
            });
 
         }
    }
    

    componentDidMount(){
        this._loadUserRoles();
    }
    componentWillReceiveProps(newProps){  

        if(!this._isIniData){
            this.model.load();
            this._isIniData = true ; 
        }
        this.grid.rowData = newProps[MODE]['list'] || [] ;  
        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);

    }

    /* WHERE*/
    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }

    _fixColumRoles(userRoles){

        userRoles.map((item)=>{
            this.grid.colums.push(
                { headerName: item[0]['group_name'], field:"field-"+item[0]['group_user_id'], width:'140px'}
            )
        });

        this.grid.colums.push(
            { 
                headerName: <a style={{borderRadius:12,fontSize:9}} className="btn btn-xs btn-normal" onClick={()=>{ alert('ok') }}> 
                    <i className="font-12 mr-5 fa fa-plus-circle"></i> Thêm nhóm phân quyền </a>, 
                field:"field-button", 
                width:'140px'
            }
        )

    }
    render() {

        
        return (
            <div hidden={ this.state.tab === this.props.onTab ? false : true } style={{padding:30}} className="animated fadeIn">
                <Table className="product-board table vk-table">
                    <thead>
                        <tr>
                            { 
                                this.grid.colums.map((item,index)=>{
                                    return(
                                        <th key={index} style={{width:item.width}}>{ item.headerName } </th> 
                                    )
                                })
                            }
                        </tr>
                    </thead>

                    <tbody style={{height:'79vh'}}>          
                        {
                            this.grid.rowData.map((item,index)=>{
                                const stt = index + 1;
                                
                                
                                                    

                                return(
                                    <tr key={item.id}>
                                        {
                                            this.grid.colums.map((item2,index2)=>{
                                                //console.log(item2);

                                                let value = '';
                                                if(index2===0){
                                                    value = stt  
                                                }else if(item2['field']==='admin'){
                                                    value = <AppSwitch 
                                                                 className={'mx-1'} 
                                                                variant={'pill'} color={'primary'}  checked={ true } disabled={true} />
                                                }else if(item2['field'].indexOf('field-')>-1){

                                                    if(item2['field'] !=='field-button'){
                                                        const group_id = parseInt(item2['field'].replace('field-',''));
                                                        const isChecked =  this._detectRoles(group_id,item['id']);

                                                        value = <AppSwitch 
                                                                        className={'mx-1'} 
                                                                    variant={'pill'} color={'primary'}  checked={ isChecked }  />
                                                        
                                                    }
                                                
                                                }else{
                                                    value = item[item2['field']];
                                                }
                                                return (
                                                    <td key={index2} style={{ width: item2['width'] }} >  
                                                         { value }
                                                    </td>
                                                )
                                            })
                                        }
                                        
                                        
                                    </tr>
                                )
                            })
                        }
                    </tbody> 
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        [MODE]: state[MODE]
    }
}

export default connect(mapStateToProps)(Role);