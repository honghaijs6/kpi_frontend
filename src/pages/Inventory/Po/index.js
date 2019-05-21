
import { PURCHASE_STATUS } from '../../../config/app.config';
import { PAYMENT_TYPES_DECO } from '../../../config/payment.type';

import Model from '../../../model/model';

// HOOK ULTI 
import moment from 'moment';
import numeral from 'numeral' ; 


import React, { Component } from 'react';
import { ButtonGroup, FormGroup, Input, Label } from 'reactstrap'; 


import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MyForm from './Form';
import ProgressForm from './ProgressForm' ; 
import DeleteForm from './DeleteForm'; 


import { BenGrid } from '../../../components/BenGrid2';

import ButtonExpand from '../../../components/ButtonExpand';
import ButtonExpandList from '../../../components/ButtonExpandList'; 

import BenMessage from '../../../components/BenMessage' ; 
import SelectList from '../../../components/SelectList'; 
import SelectListModelCode from '../../../components/SelectListModelCode';

import RankDatePicker from '../../../components/RankDatePicker'; 

const MODE = 'purchases';
const MODE_NAME = 'Đơn mua hàng';

class Po extends Component {

    
    _curInfo = {}

    constructor(props){
        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'', 
            isFormOpen:false,
            isOpenProgressForm:false,
            isOpenDeleteForm:false,
            actions:[
                {code:'update',icon:'fa-pencil',name:'Cập nhật PO'},
                {code:'remove',icon:'fa-trash',name:'Huỷ PO',active:true},
                {code:'progress',icon:'icon icon-fire',name:'Xử lý tiến trình'},

                {code:'out_stock', icon:'fa-truck',name:'Tạo phiếu nhập kho'},
                {code:'income',icon:'fa-heartbeat',name:'Tạo phiếu chi'},
                {code:'pdf',icon:'fa-file-pdf-o',name:'Xuất File PDF'},
                {code:'print',icon:'fa-print',name:'In Đơn hàng'}
            ]
        }

        this.grid = {
            colums:[
              {headerName: "Mã ĐH", field: "code", width:140,
                cellRenderer(params){
                    return `<span class="badge bg-green text-uppercase"> ${ params.value } </span>` ;
                }
              },
              {headerName:"NCC",field:"supplier_code", width:140,
                 cellRenderer(params){
                     return `<span class="badge bg-blue text-uppercase"> ${params.value} </span>`
                 }
              },

              {
                  headerName:"Nguồn", field:"supplier_info", width:100,
                  cellRenderer(params){
                      const supInfo = JSON.parse(params.value);
                      return `<span class="text-uppercase"> ${supInfo.roots} </span>`
                  }
              },
              
              {headerName: "Trạng thái", field: "status",width:140,
                cellRenderer(params){
                    return `<span style="background: ${PURCHASE_STATUS[params.value]['color']}; color:#fff " class="badge"> <i class="fa mr-5 ${ PURCHASE_STATUS[params.value]['icon'] }"></i> ${PURCHASE_STATUS[params.value]['name']} </span>`;
                }
              },

              {
                  headerName:"Hạn mức", field:"payment_code", width:140,
                  cellRenderer(params){
                      return `
                        <span class="text-uppercase">
                           ${ PAYMENT_TYPES_DECO[params.data.payment_type] } 
                           <span class="ml-5"> ${params.value} </span>
                           <span class="ml-5 text-red"> [${params.data.payment_debt}] </span>
                        </span>
                      `;
                  }
              },

              {headerName: "Ngày tạo", field: "date_created",width:140,
                cellRenderer(params){
                    const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                    return `
                    ${ humanDate }
                `
                }
              },

              {headerName: "Ngày Duyệt", field: "date_approved",width:140,
                cellRenderer(params){
                    const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                    return `
                    ${ humanDate }
                `
                }
              },

              {headerName: "Ngày mua", field: "date_in", width:140,
                cellRenderer(params){
                    const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                    return `
                    ${ humanDate }
                `
                }
              },
              
              {headerName: "Ngày chi", field: "date_paid", width:140,
                cellRenderer(params){
                    const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                    return `
                    ${ humanDate }
                `
                }
              },
              
              { headerName:"VAT", field:"vat", width:100 },

              {headerName:"Tổng tiền +VAT", field:"total_sum_vat",width:180,
                 cellRenderer(params){
                     return numeral(params.value).format('0,0')+' đ'
                 }
              },
              { headerName:"Kho", field:'code', width:140 },
              { headerName:"Phụ trách", field:"creator", width:140 }
              
            ],
            rowData: []
        }
        
        this._setup();

        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._onProgressFormSubmit = this._onProgressFormSubmit.bind(this); 
        this._onDeleteFormSubmit = this._onDeleteFormSubmit.bind(this); 
        

    }

    _setup(){
        this.model = new Model(MODE,this.props.dispatch) ;
    }

    _load(){

        this.model.load(); 
    }
    _doOpenModalUpdate(data){
        //this._curInfo = data ;
        this.setState({
            isOpenForm:true
        });
    }

    async _callAction(item){
        //const eventClick = new Event('click');
        document.querySelector('body').click();
        if(JSON.stringify(this._curInfo)!=='{}'){
            switch(item.code){

                case 'update':
                    this._doOpenModalUpdate() ; 
                break;

                case 'remove':
                    this.setState({
                        isOpenDeleteForm:true
                    });

                    /*let result = await BenConfirm({
                        title: 'Cảnh báo',
                        message: "Bạn có chắc là muốn xoá dữ liệu này ?"
                    });

                    if(result){
                        this.model.delete(this._curInfo.id,(res)=>{

                        })
                    }*/
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

    _onDeleteFormSubmit(res){
        // remove record

        this._curInfo = res.data; 
        const isOpen = res.name === 'success' || res.name ==='ok' ? false : true;    
        
        this.setState({
          status:res.name,
          isOpenDeleteForm:isOpen
        });

    }
    _onProgressFormSubmit(res){
    
        // update curent info
        this._curInfo = res.data; 
        const isOpen = res.name === 'success' || res.name ==='ok' ? false : true;    

        this.setState({
          status:res.name,
          isOpenProgressForm:isOpen
        });
    
    
    }


    // SUBMIT UPDATE 
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

    /* WHERE*/
    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }

    
    componentDidMount(){  
        this._load();
      }
    
    componentWillReceiveProps(newProps){
        
        this.grid.rowData = newProps[MODE]['list'];
        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);
        
    }

    
    render(){
        return(
            <div className="animated fadeIn">
                <div className="ubuntu-app" style={{marginTop:20,padding:10}}>
                    <main>

                        <MyForm

                            width='90%'
                            data={ this._curInfo }
                                
                            isOpen={this.state.isOpenForm}
            
                            onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}
            
                            model={this.model}
            
                            onSubmit={ this._onFormSubmit }
                            
                        />
                        
                        <DeleteForm 
                            name="Cảnh báo"
                            isOpen={ this.state.isOpenDeleteForm }
                            onToggle={(isOpen)=>{ this.setState({isOpenDeleteForm:isOpen}) }}
                            onSubmit={ this._onDeleteFormSubmit }    
                            model={this.model}
                            data={ this._curInfo }

                        />
                        <ProgressForm 

                            name="Tiến trình" 
                            isOpen={ this.state.isOpenProgressForm } 
                            onToggle={(isOpen)=>{ this.setState({isOpenProgressForm:isOpen}) }}
                            onSubmit={ this._onProgressFormSubmit }
            
                            model={this.model}
                            data={ this._curInfo }
                            width='40%'
            
                        />
                        
                        <BenGrid

                            onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                            onCellSelected={(json)=>{ this._curInfo = json  }}

                            gridID='id'
                            rowSelection='single'

                            isRightTool={ true }
                            height="77.5vh"

                            nextColums={ this.grid.colums }
                            rowData={this.grid.rowData}
                            model={ this.model }
                            formStatus={ this.state.status }
                            
                            customButton={
                                <ButtonGroup>
                                    
                                    <Link className="btn btn-normal" style={{borderRadius:0}} to="/inventory/po/add"> <i className="fa fa-plus-circle"></i> Tạo PO </Link>
                                    <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                                    
                                    <RankDatePicker onChange={(rank)=>{ this._loadWithDate(rank) }} />
                                    
                                    <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                                        <FormGroup>
                                        <Label> Trạng thái </Label>
                                        <SelectList name="Tất Cả" onChange={(e)=>{ this._onChange('status',e.target.value) }}  rows={ PURCHASE_STATUS } />
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

const mapStateToProps = (state) => {
    return {
        [MODE]: state[MODE]
    }
}

export default connect(mapStateToProps)(Po);
