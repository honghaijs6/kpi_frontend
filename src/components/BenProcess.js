
import { ORDER_STATUS } from '../config/app.config'
import React, { Component } from 'react';


const BenProcess = (props)=>{

    const status = parseInt(props.status) + 1
    const percent = status * 16.66; 



    return (
        <div style={{
            borderRadius:12,
            background:'#fff',
            border:'1px solid #18A689',
            padding:1
        }}>
            <div style={{
                background:'#18A689',
                borderRadius:12,
                width: percent+'%' ,
                color:'#fff',
                fontSize:11,
                textAlign:'center'   
            }}>
                { ORDER_STATUS[props.status]['name'] }
            </div>
        </div>
    )

}

BenProcess.defaultProps = {
    status : 0
}


export default BenProcess
