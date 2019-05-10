
/*
supplier page
*/

/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

/*............*/


/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';

const MODE = 'suppliers';
const MODE_NAME = 'Nhà cung cấp';
const MODE_TAB = 'supplierPage';

class SupplierPage extends Component{

  _isData = false;

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:MODE_TAB,
      isIniData:false
    }

    this.data = {
      [MODE]:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã", field: "code",width:200},
        {headerName: "Tên công ty", field: "name",width:300},
        {headerName: "Loại hình", field: "type",width:140},

        {headerName: "Người liên hệ", field: "contact_name",width:200},
        {headerName: "Số ĐT", field: "phone",width:150},
        {headerName: "Email", field: "email",width:200},
        
        {headerName: "Cho công nợ", field: "dept",width:150},
        {headerName: "Người tạo", field: "creator",width:200},
        {headerName: "Ngày tạo", field: "date_created",width:150,

          cellRenderer(params){

            const humanDate = moment(params.value).format('YYYY-MM-DD');
            return `
             ${ humanDate }
           `
          }

        }

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

  async _doInitData(){

    await this.model.initData();
    
    this._whereStateChange({
      isIniData:true
    })

  }

  resetGrid(){


      this.grid.rowData = this.data[MODE] ;
      this._whereStateChange({
        onAction:'resetGrid'
      });


  }

  _doOpenModalPost(){

    this._whereStateChange({
      typeAction:'post',
      onAction:'_doOpenModalPost'
    });

    this.modal.open('post');
  }
  _doOpenModalUpdate(data){

    this._whereStateChange({
      typeAction:'put',
      onAction:'_doOpenModalUpdate'
    });

    this.modal.open('put',data);


  }
  /* END HOW*/

  /* WHEN*/

  onBtnNew(){
    this._doOpenModalPost();
  }


  componentWillUnmount() {
    //this.unsubscribe();
    this._isData = false ;
  }

  componentWillReceiveProps(newProps){

    if(!this._isData){
      this._doInitData();
      this._isData = true ;
    }

    this.data[MODE] = newProps[MODE]['list'] || [] ;

    // UPDATE STATE FORM DATA
    Object.assign(this.state,newProps[MODE]['state']) ;
    

    this.resetGrid();



  }

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){


    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } style={{padding:10}} >

          <MyForm
            width='60%'
            name={ MODE_NAME }
            
            modal={this.modal}
            status={this.state.status}
            
          />
          <BenGrid

             height='78vh'
             gridID='id'
             rowSelection='single'

             formStatus={ this.state.status }

             onBtnEdit={ this._doOpenModalUpdate }
             onBtnAdd={this.onBtnNew}

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

export default connect(mapStateToProps)(SupplierPage);
