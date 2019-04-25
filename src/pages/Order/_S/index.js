
/* OBJECT - PLUGIN*/
import Model from '../../../model/model';

// HOOK ULTI 
import moment from 'moment';

import React, { Component } from 'react';
import { connect } from 'react-redux';




/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';

const MODE = 'transporters';
const MODE_NAME = 'Báo giá';


class OrderView extends Component{

  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

    }

    this.data = {}

    this.grid = {
      colums:[
        {headerName: "Mã KH", field: "type"},
        {headerName: "Mã Đơn hàng", field: "type"},
        {headerName: "Trạng thái", field: "type"},
        {headerName: "HT Thanh toán", field: "date_created"},
        {headerName: "Ngày tạo báo giá", field: "note"},
        {headerName: "Ngày xuất kho", field: "code"},
        {headerName: "Chưa VAT", field: "inventory_id"},
        {headerName: "Thành tiền", field: "action_type"},
        {headerName: "Có VAT", field: "group_code"},
        {headerName: "Ngày kết thúc", field: "creator_id"},
        {headerName: "Đã thanh toán", field: "status"},
        {headerName: "Phụ trách", field: "note"},
        

      ],
      rowData: []
    }

    this._setup();

    this.onBtnNew = this.onBtnNew.bind(this);



  }

  _setup(){

    this.model = new Model(MODE,this.props.dispatch);
    this.model.set('method',{
      name:'listAll',
      params:'all'
    });

    this.formCtrl = new formCtrl(this.model,this.props.dispatch);
    
    

  }

  /* HOW */
  resetGrid(){
      
  }

  _doOpenModalPost(){

    //this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }

  _doOpenModalUpdate(data){

  }

  _doOpenForm(){

    this.formCtrl.open('post');

    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })
  }

  /* WHEN*/

  onBtnNew(){
    this._doOpenForm();
  }
  
  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, marginTop: 20}}>
            <main>

              <MyForm

                width='90%'
                name={ MODE_NAME }
                typeAction={ this.state.typeAction }
                modal={this.formCtrl}

              />

              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 onBtnAdd={this.onBtnNew}
                 gridID='id'
                 rowSelection='single'

                 isRightTool={ true }
                 height="79.9vh"

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }

                 
              />
              
            </main>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
     [MODE]:state[MODE]
  }
}

export default connect(mapStateToProps)(OrderView);
