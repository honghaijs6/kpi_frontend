import React, { Component } from 'react';
import { connect } from 'react-redux';



class CauseDelPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            typeAction:'', // post - put - delete ...
            onAction:'', // string method
            status:'', // status
            
            tab:'causeDelPage',
            isIniData:false
        }
    }

    render(){

        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true } >
                CauseDelPage
            </div>
        )
    }

}

export default CauseDelPage ; 