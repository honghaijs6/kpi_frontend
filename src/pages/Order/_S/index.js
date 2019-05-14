
import { ORDER_STATUS } from '../../../config/app.config'; 
import { PAYMENT_TYPES_DECO } from '../../../config/payment.type'; 

 /* OBJECT - PLUGIN*/ 
import Model from '../../../model/model';

// HOOK ULTI 
import moment from 'moment';


import React, { Component } from 'react';
import { ButtonGroup, FormGroup, Input, Label } from 'reactstrap'; 



import { connect } from 'react-redux';
import { Link } from 'react-router-dom' ; 

import numeral from 'numeral' ; 


/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';
import ButtonExpand from '../../../components/ButtonExpand';
import SelectList from '../../../components/SelectList'; 
import SelectListModelCode from '../../../components/SelectListModelCode';
import RankDatePicker from '../../../components/RankDatePicker' ; 


const MODE = 'orders';
const MODE_NAME = 'Báo giá';


class OrderView extends Component{

  _curInfo = {}
  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',
      
      defaultStatusType:0,
      
    }

    this.data = {}

    this.grid = {
      colums:[
        {headerName: "Mã KH", field: "customer_code",width:150,
          cellRenderer(params){

            return `<span class="badge bg-green"> <i class="fa fa-user mr-5"></i> ${params.value} </span>`;
          }
        },
        {headerName: "Mã Đơn hàng", field: "code",width:150,
          cellRenderer(params){
            return `<span  style="background:${ ORDER_STATUS[params.data.status]['color'] }; color:#fff "class="badge text-uppercase"> ${ params.value } </span>`
          }
        },
        {headerName: "Trạng thái", field: "status",width:140,
          cellRenderer(params){
            return `
              <span style="background:${ ORDER_STATUS[params.value]['color'] }; color:#fff " class="badge"> ${ORDER_STATUS[params.value]['name']} </span>
            `
          }
        },
        {headerName: "Hạn mức", field: "payment_code",width:120,
          cellRenderer(params){
            //params.data.payment_type
            
            return ` ${ PAYMENT_TYPES_DECO[params.data.payment_type] }  <span class="text-uppercase ml-5"> ${ params.value } </span>` 
          }
        },
        {headerName: "Ngày tạo ", field: "date_created",width:120,  
          
          cellRenderer(params){
            const humanDate = moment(params.value).format('YYYY-MM-DD')
            return `
            ${ humanDate }
          `
          }
        },
        {headerName: "Ngày xuất kho", field: "date_out",width:155,

          cellRenderer(params){
            const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 

            return `
            ${ humanDate }
          `
          }
        },

        {headerName: "Ngày kết thúc", field: "date_finish",width:155,

          cellRenderer(params){
            const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 

            return `
            ${ humanDate }
          `
          }
        },  

        
        {headerName: "Tiền đơn hàng", field: "total_sum",width:150,

          cellRenderer(params){

              return numeral(params.value).format('0,0')+' đ';
          }
        },

        {
          headerName:"+VAT", field:"vat",width:90
        },


        {headerName: "Tiền sau thuế", field: "total_sum_vat",width:171,

          cellRenderer(params){

            return numeral(params.value).format('0,0')+' đ';
          }
        },

        {headerName: "Đã thanh toán", field: "total_bill",width:171,

          cellRenderer(params){

              return params.value;
          }
        },
        {
          headerName:"Phụ trách",field:"belong_user",width:140,
            cellRenderer(params){
              return `<span class="badge bg-green"> <i class="fa fa-user mr-5"></i> ${ params.value } </span>`
            }
        }
        

        
        


      
      ],
      rowData: []
    }

    this._setup();

    this.onBtnNew = this.onBtnNew.bind(this);
    
  }

  _setup(){

    this.model = new Model(MODE,this.props.dispatch);
    this.formCtrl = new formCtrl(this.model,this.props.dispatch);
    
  }


  _load(status_type=0){
    this.model.set('paginate',{
      status_type:status_type
    });
    this.model.load();
  }

  _loadWithDate(jsonDate){

    const formatDate = {
      start: moment(jsonDate.start).format('YYYY-MM-DD'),
      end:moment(jsonDate.end).format('YYYY-MM-DD')
    }
    this.model.set('paginate',{
      ...formatDate
    });

    this._load();
  }
  

  componentDidMount(){
    this._load(this.state.defaultStatusType);
  }

  componentWillReceiveProps(newProps){
    
    this.grid.rowData = newProps[MODE]['list'];
    this._whereStateChange(newProps[MODE]['state']);
    
  }

  /* HOW */
  

  _doOpenModalPost(){

    //this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }

  _doOpenModalUpdate(data){
    
    this._curInfo = data ;
    this.formCtrl.open('put',data);
    

  }

  _doOpenForm(){

    this.formCtrl.open('post');
    


  }

  /* WHEN*/

  onBtnNew(){
    this._doOpenForm();
  }
  
  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }

  
  _onChange(field,value){
    
    if(value!==''){
      this.model.set('paginate',{
        [field]:value
      });
    }else{ this.model.remove(field) }

    this.model.load(); 
  }

  render(){ 

    
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, marginTop: 20,padding:10}}>
            <main>

              <MyForm

                width='90%'
                name={ MODE_NAME }
                data={ this._curInfo }
                modal={this.formCtrl}

              />

              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 onBtnAdd={this.onBtnNew}
                 gridID='id'
                 rowSelection='single'

                 isRightTool={ true }
                 height="78vh"

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }
                 formStatus={ this.state.status }
                 
                 customButton={
                   <ButtonGroup>
                      <Link className="btn btn-normal" style={{borderRadius:0,marginRight:20}} to="/order/add"> <i className="fa fa-plus-circle"></i> Tạo báo giá </Link>

                      <Input 
                          defaultValue={ this.state.defaultStatusType } 
                          onChange={(e)=>{ this._load(e.target.value) }} style={{marginRight:10, borderRadius:0, backgroundColor:'#F5F6F7'}} type="select">

                          <option value="0"> Quản lý báo giá </option>
                          <option value="1"> Quản lý đơn Hàng </option>
                      </Input>

                      <RankDatePicker onChange={(state)=>{ this._loadWithDate(state) }} />
                      

                      <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                          <FormGroup>
                            <Label> Trạng thái </Label>
                            <SelectList name="Tất Cả" onChange={(e)=>{ this._onChange('status',e.target.value) }}  rows={ ORDER_STATUS } />
                          </FormGroup>
                          <FormGroup>
                            <Label> Hạn mức  </Label>
                            <SelectListModelCode onChange={(e)=>{ this._onChange( 'payment_code',e.target.value)  }}  name="Tất Cả" strModel='payments' />
                          </FormGroup>
                          

                      </ButtonExpand>
                      
                   </ButtonGroup>
                   
                 }

                 /*displayBtn = {['edit','remove']}*/


                 
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
