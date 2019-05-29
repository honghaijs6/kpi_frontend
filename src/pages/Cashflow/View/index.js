
// MODEL
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





const MODE = 'bills';
class CashFlowView extends Component {

    _curInfo = {}

    constructor(props){
        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'',

            isOpenForm:false,
            isOpenDeleteForm:false,

            receiptType:'',
            actions:[
                {code:'update',icon:'fa-pencil',name:'Cập nhật phiếu'},
                {code:'remove',icon:'fa-trash',name:'Huỷ phiếu',active:true},
                {code:'print',icon:'fa-print',name:'In phiếu'}
            ]

        }

        this.grid = {
            colums:[
              {headerName: "Phiếu", field: "type"},
              {headerName: "Kỳ Thanh toán", field: "date_created"},
              {headerName: "Đôi tượng", field: "code"},
              {headerName: "Tên phiếu", field: "inventory_id"},
              {headerName: "Giá trị", field: "action_type"},
              {headerName: "Tại", field: "group_code"},
              {headerName: "PTTT", field: "creator_id"},
              {headerName: "Tài khoản", field: "status"},
              {headerName: "Trạng thái", field: "note"},
              {headerName: "Người tạo", field: "note"},
              {headerName: "Ngày", field: "note"}
      
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
            receiptType:this.state.receiptType,
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
                <div className="ubuntu-app " style={{marginTop:20, padding:10}}>
                    <main>

                        <BenGrid

                            onBtnEdit={(data)=>{ this._doOpenModalUpdate()  }}
                            onBtnAdd={ this._doOpenModal }
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
                                    
                                    <Button onClick={()=>{ this._doOpenModal('in') }} className="btn btn-normal"><i className="fa fa-plus-circle mr-5"></i> Tạo phiếu nhập </Button>
                                    <Button onClick={()=>{ this._doOpenModal('out') }} className="btn btn-normal"><i className="fa fa-plus-circle mr-5"></i> Tạo phiếu xuất </Button>
                                    
                                    <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                                    
                                    
                                    <RankDatePicker onChange={(rank)=>{ this._loadWithDate(rank) }} />
                                    
                                    <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                                        
                                        <FormGroup>
                                            <Label> Phiếu  </Label>
                                            <Input type="select" onChange={(e)=>{ this._onChange('type',e.target.value) }}>
                                                <option value=""> Tất cả </option>
                                                <option value="in"> Phiếu nhập </option>
                                                <option value="out"> Phiếu xuất </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Loại </Label>
                                            <Input />

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

export default connect(mapStateToProps)(CashFlowView);