
import Model from '../../../model/model';


// LIBS 
import moment from 'moment';


import React, { Component } from 'react';
import { connect } from 'react-redux';


import { BenGrid } from '../../../components/BenGrid2';
import MyForm from './Form'; 

 
const MODE = 'offices';
const MODE_NAME = 'Văn phòng làm việc'; 


class MyOffice extends Component {

    _curInfo = {} ; 
    _isIniData = false ;

    constructor(props){
        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'',

            isOpenForm:false,

            tab:'office'
        }

        this.grid = {
            colums:[
                { headerName: "Tên ", field: "name",width:300,
                    cellRenderer(params){
                        return `
                            <span> <i class="fa fa-shirtsinbulk mr-5"></i> ${params.value} </span>
                        `;
                    }
                },

                { headerName:"Số Nhân viên", field:"total_user",width:180 },
                { headerName:"Tỉnh/Thành", field:"city",width:180 },
                { headerName:"Người tạo", field:"creator",width:180 },
                { headerName:"Ngày tạo", field:"date_created",width:140,

                    cellRenderer(params){
                        const humanDate = moment(params.value).format('YYYY-MM-DD')
                        return `
                            ${ humanDate }
                        `
                    }
                },
                { headerName:"Điều chỉnh", field:"date_modified",width:140,
                cellRenderer(params){
                    const humanDate = moment(params.value).format('YYYY-MM-DD')
                        return `
                            ${ humanDate }
                        `
                    }
                }
                
            ],
            rowData:[]
        }

        this._setup();

        this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this); 
        this._doOpenModalPost = this._doOpenModalPost.bind(this);


    }   

    _setup(){
        this.model = new Model(MODE,this.props.dispatch);
    }

    _doOpenModalUpdate(){

    }
    _doOpenModalPost(){
        
        this.setState({
            isOpenForm:true,
            typeAction:'post'
        });
    }
    
    _onSubmitForm(res){
        if(res.name==='success' || res.name==='ok'){

            this._curInfo = {}
            
            this.setState({
                isOpenForm:false,
                typeAction:'',
                receiptType:'',
                status:res.name
            });
 
         }
    }
    componentWillReceiveProps(newProps){
    
        if(!this._isIniData){
            this.model.load();
            this._isIniData = true ; 
        }

        this.grid.rowData = newProps[MODE]['list'] || [] ;  
        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);
    }

    /* WHERE*/
    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }

    render() {
        return (
            <div hidden={ this.state.tab === this.props.onTab ? false : true } className="animated fadeIn" style={{padding:10}} >

                <MyForm

                    typeAction={this.state.typeAction}
                    width="36%"
                    data={ this._curInfo }
                    model={this.model}
                    isOpen={ this.state.isOpenForm }
                    onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}
                    
                    onSubmitForm={ (res)=>{ this._onSubmitForm(res) }}


                />
                <BenGrid

                    height='77.5vh'
                    gridID="id"

                    onBtnEdit={ this._doOpenModalUpdate }
                    onBtnAdd={this._doOpenModalPost}   

                    rowSelection='single'
                    formStatus={ this.state.status }
                    isRightTool={ true }
                        

                    nextColums={ this.grid.colums }
                    rowData={this.grid.rowData}
                    model={ this.model }
                    
                        
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        [MODE]: state[MODE]
    }
}

export default connect(mapStateToProps)(MyOffice) ;