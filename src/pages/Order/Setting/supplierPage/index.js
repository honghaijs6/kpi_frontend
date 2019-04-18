
/*
supplier page
*/

/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';



import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Button } from 'reactstrap';


import moment from 'moment';
/* HOOKED*/
import { doLoadSubRegion, doLoadRegion } from '../../../../hook/ultil';
/*............*/



/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';

const MODE = 'suppliers';
const MODE_NAME = 'Nhà cung cấp';
const MODE_TAB = 'supplierPage';

const REGION_CODE = '79'; // HCM
const SUBREGION_CODE = '760'; // quan 1


class SupplierPage extends Component{

  _isData = false;

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'supplierPage',
      isIniData:false
    }

    this.data = {
      [MODE]:[],
      regions:[],
      subregions:[]
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

    doLoadRegion(this.props.dispatch);


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

    doLoadSubRegion(REGION_CODE,this.props.dispatch,(res)=>{


      this._whereStateChange({
        typeAction:'post',
        onAction:'_doOpenModalPost'
      });

      this.modal.open('post');



    });


  }
  _doOpenModalUpdate(data){

    doLoadSubRegion(data.region_code,this.props.dispatch,(res)=>{

      this.data.subregions = res.rows ;

      this._whereStateChange({
        typeAction:'put',
        onAction:'_doOpenModalUpdate'
      });

      this.modal.open('put',data);


    });

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
    this.resetGrid();



  }

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    const formTitle = this.state.typeAction === 'post' ? 'Tạo '+ MODE_NAME : 'Chỉnh sửa '+MODE_NAME;

    const regions = this.props.regions.list || [] ;
    const subregions = this.props.subregions.list || [] ;




    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >

          <MyForm
            width='60%'
            name={ formTitle }
            typeAction={ this.state.typeAction }
            modal={this.modal}
            regions={ regions }
            subregions={ subregions }


          />
          <BenGrid

             height='79.9vh'

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

function mapStateToProps(state){
  return {
     [MODE]:state[MODE],
     regions:state.regions,
     subregions:state.subregions
  }
}

export default connect(mapStateToProps)(SupplierPage);
