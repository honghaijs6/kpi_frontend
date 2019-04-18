import React, { Component } from 'react';
import { connect } from 'react-redux';


class NotificationPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            onAction:'',
            typeAction:'',
            status:'',

            tab:'notificationPage'
        }
    }

    render(){

        return(
            <div hidden={ this.props.onTab === this.state.tab ? false : true } >
                Notification Page
            </div>
        )
    }
}

export default NotificationPage ; 