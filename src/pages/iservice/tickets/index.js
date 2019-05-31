
// DATA
import Model from '../../../model/model';

// LIBS 
import moment from 'moment';



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, FormGroup, Input, Label } from 'reactstrap'; 

import { BenGrid } from '../../../components/BenGrid2' ; 

import BenMessage from '../../../components/BenMessage'; 
import ButtonExpand from '../../../components/ButtonExpand';
import ButtonExpandList from '../../../components/ButtonExpandList'; 

import SelectList from '../../../components/SelectList'; 
import RankDatePicker from '../../../components/RankDatePicker'; 


import MyForm from './Form'; 


const MODE = 'iservices';
 
class Tickets extends Component {

    _curInfo={};

    constructor(props){
        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'',

            isOpenForm:false,
            isOpenDeleteForm:false,

            receiptType:'outdoor', // MAC DINH LA DỊCH VỤ TẬN NƠI
            actions:[
                {code:'update',icon:'fa-pencil',name:'Cập nhật phiếu'},
                {code:'remove',icon:'fa-trash',name:'Huỷ phiếu',active:true},
                {code:'print',icon:'fa-print',name:'In phiếu'}
            ]



        }

        this.grid = {
            colums:[
              {headerName: "Mã", field: "code",width:140, 
                cellRenderer(params){
                    return `<span class=" finalcial-${params.data.type} text-uppercase"> ${params.value} </span>`
                }
              },
              {headerName: "Loại", field: "bill_acc_type",width:100},
              {headerName: "Chứng từ", field: "ref_code", width:180,
                 cellRenderer(params){
                     return `<span class="text-uppercase"> ${params.value} </span>`
                 }
              },
              
              {headerName: "Vấn đề", field: "content_issue",width:410 },
              {
                  headerName:"Trạng thái", field:"status", width:180
              },
              {headerName: "Phụ trách", field:"belong_user",width:140},  
              
              {headerName: "Người tạo", field: "creator",width:160},
              {headerName: "Ngày tạo", field: "date_created",width:140,
                  cellRenderer(params){
                      const humanDate = moment(params.value).format('YYYY-MM-DD');
                      return humanDate;
                  }
              },
              {
                  headerName:"Điều chỉnh",field:"date_modified",width:140,
                  cellRenderer(params){
                    const humanDate =  params.value !== null ? moment(params.value).format('YYYY-MM-DD') : '' ;
                    return humanDate;
                  }
              }
      
            ],
            rowData: []
        }

        this._setup();



    }

    _setup(){
        this.model = new Model(MODE,this.props.dispatch);

    }

    _doOpenModalUpdate(){
        
        this.setState({
            receiptType:this._curInfo.type,
            isOpenForm:true,
            typeAction:'put'
        });
    }
    _doOpenModal(receiptType){

        this.setState({
            receiptType:receiptType,
            isOpenForm:true,
            typeAction:'post'
        });

        


    }
    _onSubmitForm(res){
        if(res.name==='success' || res.name==='ok'){
           this._curInfo = {}

           this.setState({
               isOpenForm:false,
               isOpenDeleteForm:false,
               typeAction:'',
               receiptType:'',
               status:res.name
           });

        }
    }

    _callAction(item){

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

        this.model.load();
        
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
        this.model.load();
    }
    componentWillReceiveProps(newProps){
        this.grid.rowData = newProps[MODE]['list'];

        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);
    }


    render() {
        return (
            <div className="animated fadeIn">
                <div className="ubuntu-app" style={{marginTop:20, padding:10}}>
                    <main>


                        <MyForm
                            width="50%"

                            isOpen={this.state.isOpenForm}
                            onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}

                            model={this.model}
                            receiptType={this.state.receiptType}
                            typeAction={this.state.typeAction}
                            onSubmitForm={ (res)=>{ this._onSubmitForm(res) }}

                            data={this._curInfo}
                        />
                        <BenGrid

                            onBtnEdit={(data)=>{ this._doOpenModalUpdate()  }}
                            
                            onCellSelected={(json)=>{ this._curInfo = json  }}
        
                            gridID='id'
                            rowSelection='single'
        
                            isRightTool={ true }
                            height="77.5vh"
        
                            nextColums={ this.grid.colums }
                            rowData={this.grid.rowData}
                            model={ this.model }
                            formStatus={ this.state.status }

                            displayBtn={[]}

                            customButton={
                                <ButtonGroup>
                                    
                                    <Button 
                                        onClick={()=>{ this._doOpenModal('outdoor') }} className="btn btn-normal">
                                        <i className="fa fa-plus-circle mr-5"></i> Phiếu Dịch vụ  
                                    </Button>
                                    <Button 
                                        onClick={()=>{ this._doOpenModal('issue') }} className="btn btn-normal">
                                        <i className="fa fa-plus-circle mr-5"></i> Phiếu tiếp nhận 
                                    </Button>
                                    
                                    <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                                    
                                    
                                    <RankDatePicker onChange={(rank)=>{ this._loadWithDate(rank) }} />
                                    
                                    <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                                        
                                        <FormGroup>
                                            <Label> Loại Phiếu  </Label>
                                            <Input type="select" onChange={(e)=>{ this._onChange('type',e.target.value) }}>
                                                <option value=""> Tất cả </option>
                                                <option value="pt"> Phiếu thu </option>
                                                <option value="pc"> Phiếu chi </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Hình thức T.T </Label>
                                            {/*<SelectList onChange={(e)=>{ this._onChange('acc_type',e.target.value) }} name="Tất cả" rows={ BILL_ACC_TYPES } />*/}


                                        </FormGroup>

                                    </ButtonExpand>
                                    
                                </ButtonGroup>
                            
                            }
                            
                        />
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        [MODE]: state[MODE]
    }
}

export default Tickets ; 
