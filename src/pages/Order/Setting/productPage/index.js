import {PRODUCT_TYPE_DECO,LIST_PRODUCT_TYPE} from '../../../../config/product.conf';


/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';

/*  HOOKS */
import doLoadAll from '../../../../hook/ultil/doLoadAll';
import { doGetModelInfo } from '../../../../hook/ultil'



import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input, ButtonGroup } from 'reactstrap';



import moment from 'moment';
import numeral from 'numeral';

  

/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';
import SelectListModel  from '../../../../components/SelectListModel';
import SelectList from '../../../../components/SelectList'; 


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

    this.data = {
      [MODE]:[],
      'categories':[],
      'units':[]
    }

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
  async _doOpenModalUpdate(data){
      
      const info =  await doGetModelInfo('products',data.id);
      Object.assign(data,info)
      this.modal.open('put',data);

      this._whereStateChange({
        typeAction:'put',
        onAction:'open_modal'
      });

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
    this.resetGrid(); // HAD INSIDE setSatte 
    

  }

  /* WHERE*/
  async _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));

    switch(newState.onAction){
        case 'open_modal':
        const resCate =  await doLoadAll('categories'); 
        this.data.categories = resCate.name === 'success' ? resCate.rows : [] ; 
        this.setState({
          onAction:'doLoadAll'
        });
        
        const resUnit = await doLoadAll('units') ; 
        this.data.units = resUnit.name === 'success' ? resUnit.rows : [] ;
        this.setState({onAction:'doLoadAll'});
      break ;
    }

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

            categories={ this.data.categories }
            units={ this.data.units }

          />
          <BenGrid

             height='79vh'
             rowSelection="single"
             gridID="id"
             onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
             onBtnAdd={this.onBtnNew} 

             isRightTool={ true }
             nextColums={ this.grid.colums }
             rowData={this.grid.rowData}
             model={ this.model }

             customButton={
                <ButtonGroup style={{marginRight:10}}>

                    <SelectListModel onChange={(e)=>{ alert(e.target.value) }} strModel="categories" name="Danh Mục" style={{borderRadius:0, marginRight:10}} />
                    <SelectList onChange={(e)=>{ alert(e.target.value) }} name="Loại" style={{borderRadius:0}} rows={ LIST_PRODUCT_TYPE } />

                </ButtonGroup>
             }
          />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
     [MODE]:state[MODE],
     'categories':state.categories,
     'units':state.units
  }
}


export default connect(mapStateToProps)(ProductPage)
