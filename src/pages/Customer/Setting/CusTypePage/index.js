import { REF_PRICES } from '../../../../config/price.conf'
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

const MODE = 'customer_types';
const MODE_TAB = 'CusTypePage';
const MODE_NAME = 'Nhóm Khách Hàng';


class CategoryPage extends Component{

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

        {headerName: "Màu ", field: "color_code",width:90,
          cellRenderer(params){

            return `<span class="badge" style="background:${ params.value }; color:${params.value}">1111</span>`
          }
        },
        {headerName: "Mã ", field: "code",width:140,
          cellRenderer(params){
            return `<span class="text-uppercase"> ${params.value} </span>`
          }
        },
        
        {headerName: "Tên ", field: "name",width:320},
        {headerName:"Giá tham chiếu", field:"ref_price", width:180,

          cellRenderer(params){
            
            return REF_PRICES[params.value]
          }
        },
        {headerName: "Khách Hàng ", field: "total_customer",width:140},
        {headerName: "Người tạo", field: "creator",width:200},
        {headerName: "Ngày tạo", field: "date_created",width:200,
          
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
  
  
  componentDidMount(){
    this.model.initData();
  }
  componentWillReceiveProps(newProps){
    
    this.data[MODE] = newProps[MODE]['list'] || [] ;
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
            name={ MODE_NAME }
            modal={this.modal}
            
          />
          <BenGrid

             height='78vh'
             gridID='id'
             onBtnEdit={ this._doOpenModalUpdate }
             onBtnAdd={ this.onBtnNew }
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


export default connect(mapStateToProps)(CategoryPage)