
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
import ProgressForm from './ProgressForm' ; 



/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';
import ButtonExpand from '../../../components/ButtonExpand';
import ButtonExpandList from '../../../components/ButtonExpandList'; 
import BenConfirm from '../../../components/BenConfirm' ;
import BenMessage from '../../../components/BenMessage' ; 


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
      isOpenForm:false,
      isOpenProgressForm:false,
      defaultStatusType:0,
      
      actions:[
        {code:'update',icon:'fa-pencil',name:'Cập nhật báo giá'},
        {code:'remove',icon:'fa-trash',name:'Huỷ báo giá',active:true},
        {code:'progress',icon:'icon icon-fire',name:'Xử lý tiến trình'},
        
        {code:'out_stock', icon:'fa-truck',name:'Tạo phiếu xuất kho'},
        {code:'income',icon:'fa-heart',name:'Tạo phiếu thu'},
        {code:'pdf',icon:'fa-file-pdf-o',name:'Xuất File PDF'},
        {code:'print',icon:'fa-print',name:'In Đơn hàng'},
        
      ]
    }

    

    this.grid = {
      colums:[
        {headerName: "Mã KH", field: "customer_code",width:150,
          cellRenderer(params){

            return `<span class="badge bg-green"> <i class="fa fa-user mr-5"></i> ${params.value} </span>`;
          }
        },
        {headerName: "Mã", field: "code",width:150,
          cellRenderer(params){

            const code = params.data.code_pi !== null ? params.data.code_pi : params.value;
            return `<span  style="background:${ ORDER_STATUS[params.data.status]['color'] }; color:#fff "class="badge text-uppercase"> ${ code } </span>`
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
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onProgressFormSubmit = this._onProgressFormSubmit.bind(this); 


    
  }

  _setup(){

    this.model = new Model(MODE,this.props.dispatch);
    
    
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
    
  async _callAction(item){
    
    //const eventClick = new Event('click');
    document.querySelector('body').click();
    
    
    if(JSON.stringify(this._curInfo)!=='{}'){
      switch(item.code){

        case 'update':
          this._doOpenModalUpdate() ; 
        break;

        case 'remove':
          
          let result = await BenConfirm({
            title: 'Cảnh báo',
            message: "Bạn có chắc là muốn xoá dữ liệu này ?"
          });

          if(result){
             this.model.delete(this._curInfo.id,(res)=>{

             })
          }
        break ;

        case 'progress':
           this.setState({
             isOpenProgressForm:true
           }); 
        break ;
  
      }
    }else{ 
        BenMessage({
          title:'Thông báo',
          message:'Vui lòng chọn chọn dữ liệu cần xử lý '
        }) ;
    }
  }

  _doOpenModalPost(){

    //this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }

  _doOpenModalUpdate(data){
    //this._curInfo = data ;
    this.setState({
      isOpenForm:true
    });
   
  }

 

  /* WHEN*/
  
  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }

  _onProgressFormSubmit(res){
    
    // update curent info
    this._curInfo = res.data; 
    
    this.setState({
      status:res.name
    });


  }
  _onFormSubmit(status){

    const isOpen = status === 'success' || status ==='ok' ? false : true;
    this.setState({
      status:status,
      isOpenForm:isOpen
    });

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

    const FORM_NAME  = this._curInfo.status_type === 0 ?  
          <span> Báo giá : <span className='text-uppercase'> { this._curInfo.code } </span> </span> 
        : <span> Đơn hàng : <span className='text-uppercase'> { this._curInfo.code_pi } </span> </span> 
    
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, marginTop: 20,padding:10}}>
            <main>

              <ProgressForm 

                name="Tiến trình" 
                isOpen={ this.state.isOpenProgressForm } 
                onToggle={(isOpen)=>{ this.setState({isOpenProgressForm:isOpen}) }}
                onSubmit={ this._onProgressFormSubmit }

                model={this.model}
                data={ this._curInfo }
                width='40%'

              />
              <MyForm

                width='90%'
                name={ FORM_NAME }
                data={ this._curInfo }
                
                isOpen={this.state.isOpenForm}

                onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}

                model={this.model}

                onSubmit={ this._onFormSubmit }
                
              />

              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 

                 onCellSelected={(json)=>{ this._curInfo = json  }}

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

                      
                      <Link className="btn btn-normal" style={{borderRadius:0}} to="/order/add"> <i className="fa fa-plus-circle"></i> Tạo báo giá </Link>
                      
                      <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                      

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

                 displayBtn = {[]}


                 
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
