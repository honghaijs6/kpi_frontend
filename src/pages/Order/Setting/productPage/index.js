import {PRODUCT_TYPE_DECO} from '../../../../config/product.conf';


/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';


import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';



import moment from 'moment';
import numeral from 'numeral';



/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';


const MODE = 'products';
const MODE_NAME = 'Sản phẩm';
const MODE_TAB = 'productPage';


class ProductPage extends Component{

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

            return PRODUCT_TYPE_DECO[params.value];
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


  componentWillReceiveProps(newProps){

    // revice redux data
    this.data[MODE] = newProps[MODE]['list'] || [] ;
    this.resetGrid();

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

             height='79vh'

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

function mapStateToProps(state){
  return {
     [MODE]:state[MODE]
  }
}


export default connect(mapStateToProps)(ProductPage)
