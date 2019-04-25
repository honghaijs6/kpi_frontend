/* 
DANH MUC : categories 
TAB  : categoryPage
*/

/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';

// HOOK ULTI 
import moment from 'moment';



import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Button } from 'reactstrap';


/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';

const MODE = 'bill_accounts';
const MODE_TAB = 'BillAccountPage';
const MODE_NAME = 'Tài Khoản Thanh Toán';


class BillAccountPage extends Component{

  _isData = false;
  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:MODE_TAB
      
    }

    this.data = {}

    this.grid = {
      colums:[
        {headerName: "Tên", field: "code"},
        {headerName: "Loại", field: "name", width:320},
        {headerName: "Số TK", field: "address", width:410},
        {headerName: "Phiếu thu", field: "creator_id"},
        {headerName: "Phiếu Chi", field: "date_created"},
        {headerName: "Người tạo", field: "date_created"},
        {headerName: "Ngày tạo", field: "date_created"},

      ],
      rowData: []
    }

    this._setup();
    this.onBtnNew = this.onBtnNew.bind(this)
    this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this);


  }

  _setup(){

    this.model = new Model(MODE,this.props.dispatch);
    this.model.set('method',{
      name:'listAll',
      params:'all'
    });
    
    this.modal = new formCtrl(this.model,this.props.dispatch);
    

  }

  /* HOW */
  resetGrid(){
      
      this.grid.rowData = this.data[MODE];
      this._whereStateChange({
        onAction:'resetGrid'
      });


  }

  _doOpenModalPost(){

    this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'_doOpenModalPost'
    })

  }
  _doOpenModalUpdate(data){
    this.modal.open('put',data);
    this._whereStateChange({
      typeAction:'put',
      onAction:'_doOpenModalUpdate'
    })

  }
  /* END HOW*/

  /* WHEN*/

  onBtnNew(){
    this._doOpenModalPost();
  }
  
  

  
  componentWillUnmount(){
    console.log('unmoutn from catepage');
    this._isData = false; 

  }
  componentWillReceiveProps(newProps){
    
    if(!this._isData){
      this.model.initData() ; 
      this._isData = true ; 
      
    }

    this.data[MODE] = newProps[MODE]['list'] || [] ;
    this.resetGrid();


  }
  

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){
    
    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >

          <MyForm
            name={ MODE_NAME }
            typeAction={ this.state.typeAction }
            modal={this.modal} 

          />
          <BenGrid

             height='79.9vh'
             gridID="id"
             onBtnEdit={ this._doOpenModalUpdate }
             onBtnAdd={this.onBtnNew}   
             rowSelection='single'

             isRightTool={ true }

             nextColums={ this.grid.colums }
             rowData={this.grid.rowData}
             model={ this.model }

             
          />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
     [MODE]:state[MODE]
  }
}


export default connect(mapStateToProps)(BillAccountPage)