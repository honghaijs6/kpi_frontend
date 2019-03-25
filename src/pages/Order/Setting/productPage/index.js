
import React, { Component } from 'react';
import { Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import numeral from 'numeral';
import Store from '../../../../redux/store';
import Model from '../../../../model/model';


import moment from 'moment';


/* HOOKED*/
/*............*/
/*------------*/

/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';

import {PRODUCT_TYPE} from '../../../../config/product.conf';

const MODE = 'products';
const MODE_NAME = 'Sản phẩm';
const MODE_TAB = 'productPage';


export default class CusOriginPage extends Component{

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
        {headerName: "Mã", field: "code",width:140},
        {headerName: "Tên SP", field: "name",width:330},
        {headerName: "Loại", field: "type",width:100,
          cellRenderer(params){

            return PRODUCT_TYPE[params.value];
          }
        },
        {headerName: "Danh Mục", field: "category",width:140},
        {headerName: "Giá nhà máy", field: "price_1",width:140,
          cellRenderer(params){

            const price_1 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_1} </span>`
          }
        },
        {headerName: "Giá gốc", field: "price_2",width:140,
          cellRenderer(params){

            const price_2 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_2} </span>`
          }
        },
        {headerName: "Giá đại lý", field: "price_3",width:140,
          cellRenderer(params){

            const price_3 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_3} </span>`
          }
        },
        {headerName: "Giá lẻ", field: "price_4",width:140,
          cellRenderer(params){
            const price_4 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_4} </span>`
          }
        },
        {headerName: "ĐVT", field: "unit",width:100},
        {headerName: "BH", field: "guran_month",width:100},
        {headerName: "Serial", field: "is_serial",width:100},
        {headerName: "Người tạo", field: "creator",width:140},
        {headerName: "Ngày tạo", field: "date_created",
          cellRenderer(params){
            const humanDate = moment(params.value).format('YYYY-MM-DD')
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

      this.grid.rowData = this.data[MODE];

      console.log(this.grid.rowData)

      this._whereStateChange({
        onAction:'resetGrid'
      });


  }

  _doOpenModalPost(){

    this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }
  _doOpenModalUpdate(data){
      alert('process code')
  }
  /* END HOW*/

  /* WHEN*/

  onBtnNew(){
    this._doOpenModalPost();
  }

  componentDidMount(){
    //this._isMounted = true;
    this.model.initData();

  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{

      this.data[MODE] = Store.getState()[MODE].list || []  ;
      this.resetGrid();



    })
  }

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    const formTitle = this.state.typeAction === 'post' ? 'Tạo '+MODE_NAME : 'Chỉnh sửa '+MODE_NAME;

    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >

          <MyForm
            name={ formTitle }
            typeAction={ this.state.typeAction }
            modal={this.modal}
            width='70%'

          />
          <BenGrid

             height='74vh'

             onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
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
