import { ORDER_STATUS } from '../../../config/app.config'

import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap' ; 

import ViewModal from '../../../components/ViewModal';
import BenButtonSelect from '../../../components/BenButtonSelect';



class ProgressForm extends Component {


    render() {
        return (
            <ViewModal {...this.props} onToggle={(isOpen)=>{  this.props.onToggle(isOpen)}}  >
                <div style={{
                    padding:'20px 0px'
                }}>
                    <BenButtonSelect 
                        data={ORDER_STATUS} 
                    />  

                </div>
                
                <div style={{borderTop:'1px solid #eee',padding:'20px 0px'}}>
                <div className="float-left" style={{marginTop:10}}>
                <div className="form-err text-muted" id="form-err">asdasd</div>
             </div>
             <div className="float-right" style={{paddingBottom:20}}>
                 <div role="group" className="btn-group">
                       <Button className="btn-ubuntu bg-dark" > <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                       <Button  className="btn-ubuntu-ok bg-green" > <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                 </div>
  
             </div>
                </div>


            </ViewModal>
        );
    }
}


ProgressForm.defaultProps = {
    onToggle:()=>{}
}

export default ProgressForm;



