
import Model from '../../../model/model'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  Row, Col, FormGroup,Label, Input, Table, Button, ButtonGroup  } from 'reactstrap';
import { AppSwitch } from '@coreui/react';


const MODE = 'roles';
const MODE_NAME = 'Vai trò';

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
            tab:'role'
        }

        this.grid = {
            colums:[
              { headerName:"STT",width:'50px' },
              { headerName:"SID",width:'50px'},
              { headerName: "Mã",width:'140px'},
              { headerName:" Tính năng ", width:'240px'},
              { headerName: "Root Admin", width:'140px'},

              {headerName: 
                    <a style={{borderRadius:12,fontSize:9}} className="btn btn-xs btn-normal" onClick={()=>{ alert('ok') }}> 
                       <i className="font-12 mr-5 fa fa-plus-circle"></i> Thêm nhóm phân quyền </a>, 
                width:'140px'},
              
            ],
            rowData:[]
        }



        this._setup();

        this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this); 
        this._doOpenModalPost = this._doOpenModalPost.bind(this);

    }


    _setup(){
        this.model = new Model(MODE,this.props.dispatch);
        
        this.model.set('paginate',{
            offset:0,
            p:0,
            max:'all',
            sort_by:'code', 
            sort_type:'asc' 
        });

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
                                        <td style={{ width: this.grid['colums'][0]['width'] }} > { stt }  </td>
                                        <td style={{ width: this.grid['colums'][1]['width'] }} > { item.id } </td>
                                        <td style={{ width: this.grid['colums'][2]['width'] }} > { item.code } </td>
                                        <td style={{ width: this.grid['colums'][3]['width'] }} > { item.name } </td>
                                        <td style={{ width: this.grid['colums'][4]['width'] }}>    
                                            <AppSwitch 
                                                disabled
                                                className={'mx-1'} 
                                                variant={'pill'} 
                                                color={'primary'}  
                                                checked={ true } />
                                        </td>
                                        <td style={{ width: this.grid['colums'][5]['width'] }} ></td>
                                        

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