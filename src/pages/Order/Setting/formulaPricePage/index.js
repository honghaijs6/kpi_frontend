import React, { Component } from 'react';
import { connect } from 'react-redux';


const MODE_TAB = 'formulaPricePage' ;


class SettingOrderPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            typeAction:'', // post - put - delete ...
            onAction:'', // string method
            status:'', // status
            
            tab:MODE_TAB
        }
    }


    render(){

        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true } style={{padding:10}} >
                   Công thức tính giá 
            </div>
        )
    }
}

export default SettingOrderPage; 