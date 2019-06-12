import React, { Component } from 'react';
import { Table } from 'reactstrap';


export default class BenTable extends Component {
  render() {
    return (
        <Table className="product-board table vk-table">
            <thead>
                <tr>
                    { 
                        this.props.grid.colums.map((item,index)=>{
                            return(
                                <th key={index} style={{width:item.width}}>{ item.headerName } </th> 
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody style={{height: this.props.height }}>
                {
                    this.props.grid.rowData.map((item,index)=>{

                        return(
                        <tr key={index}>
                            {
                            this.props.grid.colums.map((item2,index2)=>{
                                return(
                                    <td key={index2} style={{
                                        width: item[item2['width']]
                                    }}> 
                                        { item[item2['field']] }

                                    </td>
                                )
                            })
                            }
                        </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
  }
}

BenTable.defaultProps = {
    height:'60vh'
}
