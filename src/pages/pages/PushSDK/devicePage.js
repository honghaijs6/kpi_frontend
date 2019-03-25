import React from 'react';
import axios from 'axios';

import { Table, Row, Col, ButtonGroup, Button } from 'reactstrap';

class Devices extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      server:'http://115.78.5.75:8080',
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'devicePage',

      grid:{
        columnDefs:[
          {headerName: "Serial No", field: "code",width:200},
          {headerName: "Device Name", field: "name",width:330},
          {headerName: "Register Code	", field: "name",width:200},
          {headerName: "Device Version", field: "name",width:340}


        ],
        rowData: []
      }

    }

  }

  componentDidMount(){

    const url = this.state.server+'/deviceServlet?type=1';
    axios.post('http://115.78.5.75:8080/deviceServlet?type=1')
          .then((res)=>{
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });

  }

  render() {


    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
          <Table  className="table vk-table" >
            <thead style={{ border:0, background:'#222D32', color:'#fff' }} >
              <tr>
                <th style={{width: 30}}>
                    #
                </th>
                {
                  this.state.grid.columnDefs.map((item,index)=>{
                    return(
                      <th key={index} style={{
                        width: item.width
                      }} > { item.headerName } </th>
                    )
                  })
                }
                <th style={{width: 180}}>
                  Operation
                </th>


              </tr>
            </thead>

            <tbody style={{height: '74vh'}}>
              {
                this.state.grid.rowData.map((item,index)=>{
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
      </div>
    );
  }
}

export default Devices ;
