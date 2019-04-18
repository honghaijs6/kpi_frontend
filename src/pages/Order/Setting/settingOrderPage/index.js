import React, { Component } from 'react';
import { connect } from 'react-redux';


class SettingOrderPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            typeAction:'', // post - put - delete ...
            onAction:'', // string method
            status:'', // status
            
            tab:'settingOrderPage',
            isIniData:false
        }
    }

    render(){

        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true }>
                   SettingOrderPage 
            </div>
        )
    }
}

export default SettingOrderPage; 