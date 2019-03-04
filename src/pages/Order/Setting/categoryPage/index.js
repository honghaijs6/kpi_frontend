
import React, { Component } from 'react';

import { Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../../redux/store';
import Model from '../../../../model/model';

import moment from 'moment';


/* HOOKED*/
/*............*/


/* NAMED*/
import { CATEGORIES } from '../../../../model/model-mode';
import { CATEGORY_NAME } from '../../../../model/model-name';
import { POST, SEARCH } from '../../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';


export default class CategoryPage extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'categoryPage'
    }

    this.data = {
      category:[]
    }

    this.grid = {
      colums:[
        {headerName: "Tên ", field: "name"},
        {headerName: "Thứ tự", field: "sort"},
        {headerName: "Người tạo", field: "creator"},
        {headerName: "Ngày tạo", field: "str_date_created"}

      ],
      rowData: []
    }

    this._setup();
    this.onBtnNew = this.onBtnNew.bind(this)
    this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this);


  }

  _setup(){

    this.model = new Model(CATEGORIES);
    this.model.set('method',{
      name:'listAll',
      params:'all'
    });


    this.modal = new formCtrl(this.model);

    this._listenStore();

  }

  /* HOW */
  resetGrid(){

      let list = this.data['category'] || []  ;

      //alert(JSON.stringify(list));



      /*list.filter((item)=>{
        item['str_job_level'] = userConf.job_level[item['job_level']];
        item['str_job_type'] = userConf.job_type[item['job_type']];
        item['str_phone'] = item['phone'] === null ? 'n/a' : item['phone'];
        item['str_date_created'] = moment(item['date_created']).format('YYYY-MM-DD');
      });*/


      //alert('resetGrid');
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

      this.data.category = Store.getState().category.list || []  ;

      this.resetGrid(this.data.category);

    })
  }
  componentWillReceiveProps(newProps){

  }

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    const formTitle = this.state.typeAction === 'post' ? 'Tạo '+ CATEGORY_NAME : 'Chỉnh sửa '+CATEGORY_NAME;

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
