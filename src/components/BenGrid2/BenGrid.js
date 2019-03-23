
/*
props : nextColums : []
        model    : Object
        rowData : []
*/

import React, { Component } from 'react';

import {   Row, Col, ButtonGroup, Button, Input } from 'reactstrap';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import GridFooter from './GridFooter';

import BenConfirm from '../BenConfirm';




class BenGrid extends Component{

  constructor(props){
    super(props);


    const gridID = props.gridID || 'id';

    

    this.state = {
      isGridReady:false,
      height: props.height || '68vh',
      key:'',
      isRightTool:props.isRightTool || false,
      isLeftTool: props.isLeftTool === undefined ? true : props.isLeftTool  ,
      isChecked:false,
      columnDefs: [
        {
          headerName: "SID",
          field: gridID,
          width:200,
          checkboxSelection: true,
          filterParams: { newRowsAction: "keep" },
          checkboxSelection: function(params) {

            return params.columnApi.getRowGroupColumns().length === 0;
          },
          headerCheckboxSelection: function(params) {
            return params.columnApi.getRowGroupColumns().length === 0;
          }

        },
        ...props.nextColums
      ],
      rowSelection: "multiple",//"multiple",

          /*defaultColDef: {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true
          },*/
      rowData: [],
      count: this.props.model.db.total ,
      selectedData:[]
    }

    this.model = props.model;

    this.onBtnNew = this.onBtnNew.bind(this);
    this.onFindKeyUp = this.onFindKeyUp.bind(this);
    this.onBtnFind = this.onBtnFind.bind(this);

  }

  /* WHEN*/
  componentWillReceiveProps(newProps){

    this.gridApi.refreshCells();
    if(this.state.isGridReady){

      //this.gridApi.setRowData(newProps.rowData);
      this.gridApi.refreshCells();

      // ADD ROW
      if( newProps.model.db.total > this.state.count){
        this.gridApi.updateRowData({ add: [newProps.rowData[0]],addIndex: 0 });
      }else if(newProps.model.db.total < this.state.count){
        // REMOVE ROW
        this.gridApi.updateRowData({ remove: this.state.selectedData });
      }
      
    }

    this.setState({
      rowData:newProps.rowData,
      count:newProps.model.db.total
    });

  }


  onGridReady(params){

     this.gridApi = params.api;
     this.state.isGridReady = true ;

  }

  onFindKeyUp(e){

     e.key === 'Enter' ? this.model.find(this.state.key) :  this._whereStateChange({key:e.target.value}) ;


  }

  onBtnFind(){

    alert(this.state.key)


  }

  onBtnNew(){
    this.props.onBtnNew();
  }
  onBtnEdit(){

    
    this.props.onBtnEdit(this.state.selectedData[0]);
    

  }

  onDownload(){
    alert(JSON.stringify(this.state.rowData));

  }

  async onBtnDel(){ 

    const records = this.state.selectedData.length;

    let result = await BenConfirm({
      title: 'Warning',
      message: "Are you sure you want to delete "+ records+' records ?',

      

    });

    if(result){

      if(this.state.selectedData.length>1){
        this.model.deleteMulti(this.state.selectedData);
      }else{
        const id = this.state.selectedData[0].id;
        this.model.delete(id,(res)=>{  })
      }


    }

    //this.props.onBtnDel(this.state.selectedData);

  }

  onSelectionChanged(){
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.setState({
      selectedData:selectedData
    });

    // alway call back data on selected ;
    if(this.props.onCellSelected){
      this.props.onCellSelected(selectedData[0]) // this.props.onBtnEdit(this.state.selectedData[0]);
    }
    
  }

  /* HOW */

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render(){

    let disabledBtnEdit = this.state.selectedData.length > 0 ? false : true;
    disabledBtnEdit = this.state.selectedData.length > 1 ? true : disabledBtnEdit;
    let disabledBtnDel = this.state.selectedData.length > 0 ? false : true;

    const clnRightTool =  this.state.isRightTool ? '' : 'hidden';


    let grLeftBtn = <ButtonGroup>
                        <Button disabled={ disabledBtnEdit } onClick={ this.onBtnEdit.bind(this) } className={ 'btn-ubuntu'} > <i className="fa fa-pencil"></i> </Button>
                        <Button disabled={ disabledBtnDel } onClick={ this.onBtnDel.bind(this) }  className={ 'btn-ubuntu'} > <i className="fa fa-trash"></i> </Button>
                      </ButtonGroup>

    grLeftBtn = this.state.isLeftTool ? grLeftBtn : null ;

    

    return (

      <div>
          <div className="toolbar">
            <Row>
              <Col md={6}>
                  
                  { grLeftBtn }
                  { this.props.leftButton }
              </Col>
              <Col md={6} className={'text-right '+ clnRightTool}>

                { this.props.customButton }
                <ButtonGroup>
                    
                    <Input  placeholder="Search" onKeyUp={ this.onFindKeyUp }  style={{borderRadius:0}}  />
                    <Button style={{marginRight:10}} onClick={ this.onBtnFind }  className="btn-ubuntu"> <i className="fa fa-search"></i> </Button>


                </ButtonGroup>

              </Col>
            </Row>
          </div>

          <div className="ag-theme-material" id="myGrid" style={{boxSizing: "border-box", height: this.state.height, padding:'1rem'}}>
              <AgGridReact

                  
                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  enableSorting={true}
                  rowSelection={this.state.rowSelection}
                  enableColResize={true}
                  defaultColDef={this.state.defaultColDef}
                  onGridReady={this.onGridReady.bind(this)}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}>

              </AgGridReact>

              <GridFooter model={ this.model } />
          </div>
      </div>

    )
  }
}

export default BenGrid;
