
/*
props : nextColums : []
        model    : Object
        rowData : []
*/

import React, { Component } from 'react';

import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Table, Button, ButtonGroup  } from 'reactstrap';


import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import GridFooter from './GridFooter';

import BenConfirm from '../BenConfirm';




class BenTable extends Component{

  constructor(props){
    super(props);


    this.state = {
      height: props.height || '68vh',
      key:'',
      isRightTool:props.isRightTool || false,
      isChecked:false,
      columnDefs: [

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
      selectedData:[]
    }

    this.model = props.model;

    this.onBtnNew = this.onBtnNew.bind(this);
    this.onFindKeyUp = this.onFindKeyUp.bind(this);
    this.onBtnFind = this.onBtnFind.bind(this);

  }

  /* WHEN*/
  componentWillReceiveProps(newProps){
    this.setState({
      rowData:newProps.rowData
    });

  }


  onGridReady(params){

     //alert('grid ready ');
     this.gridApi = params.api;

  }

  onFindKeyUp(e){

     e.key === 'Enter' ? alert(this.state.key) :  this._whereStateChange({key:e.target.value}) ;


  }

  onBtnFind(){
    alert('find key')
  }

  onBtnNew(){
    this.props.onBtnNew();
  }
  onBtnEdit(data){

    this.props.onBtnEdit(data);

  }

  onDownload(){
    alert('download clicked');
  }

  async onBtnDel(data){

    let result = await BenConfirm({
      title: 'Warning',
      message: "Are you sure want to delete?",
      confirmColor: "primary",
      cancelColor: "link text-danger"

    });

    if(result){

      const id = data.id || data.uid   ;
      this.model.delete(id,(res)=>{})


    }

    //this.props.onBtnDel(this.state.selectedData);

  }

  onSelectionChanged(){
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.setState({
      selectedData:selectedData
    })

    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;

  }

  /* HOW */

  /* WHERE*/
  _whereStateChange(newState){
    //this.setState(Object.assign(this.state,newState));
  }
  render(){

    let disabledBtnEdit = this.state.selectedData.length > 0 ? false : true;
    disabledBtnEdit = this.state.selectedData.length > 1 ? true : disabledBtnEdit;
    let disabledBtnDel = this.state.selectedData.length > 0 ? false : true;

    const clnRightTool =  this.state.isRightTool ? '' : 'hidden';


    return (

      <div>
          <div className="toolbar">
            <Row>
              <Col md={6}>
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

          <div className="ag-theme-material vk-box" id="myGrid" style={{boxSizing: "border-box", height: this.state.height, padding:'1rem' }}>

              <Table striped className="table vk-table" >
                <thead style={{ border:0, background:'#222D32', color:'#fff' }} >
                  <tr>
                    <th style={{width: 30}}>
                        #
                    </th>
                    {
                      this.state.columnDefs.map((item,index)=>{
                        return(
                          <th key={index} style={{
                            width: item.width
                          }} > { item.headerName } </th>
                        )
                      })
                    }

                    <th style={{width: 140}}>
                      Tools
                    </th>


                  </tr>
                </thead>

                <tbody style={{height: this.props.height}}>
                    {
                      this.state.rowData.map((item,index)=>{
                        return(
                          <tr key={index}>
                            <td style={{width: 30}}>
                              { index }
                            </td>
                            {
                              this.state.columnDefs.map((item2,index2)=>{
                                  return(
                                    <td key={index2} style={{
                                      width: item2.width
                                    }}> { item[item2['field']] }

                                    </td>
                                  )
                              })
                            }
                            <td style={{width: 140}}>
                               <ButtonGroup>

                                  <Button onClick={()=>{ this.onBtnEdit(item) }} className="btn btn-sm btn-ubuntu"> <i className="fa fa-pencil" /> </Button>
                                  <Button onClick={()=>{ this.onBtnDel(item)  }} className="btn btn-sm btn-ubuntu"> <i className="fa fa-trash" /> </Button>

                               </ButtonGroup>
                            </td>
                          </tr>
                        )
                      })
                    }
                </tbody>

              </Table>



              <GridFooter model={ this.model } />
          </div>
      </div>

    )
  }
}

export default BenTable;
