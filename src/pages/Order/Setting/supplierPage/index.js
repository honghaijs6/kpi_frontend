
/*
supplier page
*/

import React, { Component } from 'react';
import { Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../../redux/store';
import Model from '../../../../model/model';

import moment from 'moment';


/* HOOKED*/
/*............*/


/* NAMED*/
import { POST, SEARCH } from '../../../../model/action-mode';
/*------------*/
/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';

const MODE = 'suppliers';
const MODE_NAME = 'Nhà cung cấp';
const MODE_TAB = 'supplierPage';

export default class SupplierPage extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'supplierPage'
    }

    this.data = {
      MODE:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã", field: "code",width:200},
        {headerName: "Tên công ty", field: "name",width:300},
        {headerName: "Người liên hệ", field: "contact_name",width:200},
        {headerName: "Email", field: "email",width:200},
        {headerName: "Số ĐT", field: "phone",width:200},
        {headerName: "Loại hình", field: "type",width:200},
        {headerName: "Cho công nợ", field: "dept",width:150},
        {headerName: "Người tạo", field: "creator",width:200},
        {headerName: "Ngày tạo", field: "str_date_created",width:150
          /* RENDER CELL html tags
          cellRenderer(params){

            return `
             ${params.value}
           `
          }
          */
        }

      ],
      rowData: []
    }

    this._setup();

    this.onBtnNew = this.onBtnNew.bind(this)
    this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this);


  }

  _setup(){

    this.model = new Model(MODE);
    this.model.set('method',{
      name:'listAll',
      params:'all'
    });

    this.modal = new formCtrl(this.model);

    this._listenStore();

  }

  /* HOW */
  resetGrid(){

      let list = this.data[MODE] || []  ;
      list.forEach((item)=>{
        item['str_date_created']  = moment(item['date_created']).format('YYYY-MM-DD');
      });

      this.grid.rowData = list ;
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

  componentDidMount(){
    //this._isMounted = true;

    this.model.load();

  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{

      this.data[MODE] = Store.getState()[MODE].list || []  ;
      this.resetGrid(this.data[MODE]);

    })
  }
  componentWillReceiveProps(newProps){
    if(newProps.onTab===MODE_TAB){
      this.model.load();
    }
  }

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    const formTitle = this.state.typeAction === 'post' ? 'Tạo '+ MODE_NAME : 'Chỉnh sửa '+MODE_NAME;

    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >

          <MyForm
            name={ formTitle }
            typeAction={ this.state.typeAction }
            modal={this.modal}

          />
          <BenGrid

             height='74vh'

             onBtnEdit={ this._doOpenModalUpdate }
             isRightTool={ true }

             nextColums={ this.grid.colums }
             rowData={this.grid.rowData}
             model={ this.model }

             customButton={
               <Button onClick={this.onBtnNew}  style={{ marginRight:10, borderRadius:0}}  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo  </Button>

             }
          />
      </div>
    )
  }
}
