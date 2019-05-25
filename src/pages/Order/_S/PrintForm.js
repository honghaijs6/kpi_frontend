import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

import ViewModal from '../../../components/ViewModal';
import TemplateOrder from '../../../prints/TemplateOrder';


class PrintForm extends Component {  

    
    render() {
        
        const data = this.props.data;
        
        return (
            <ViewModal name={ <span className="text-uppercase"> {data.code_pi || data.code} </span> }  { ...this.props }  onToggle={(isOpen)=>{  this.props.onToggle(isOpen)}} >
                <div>
                    
                    <div style={{padding:10, background:'#f0f0f0', borderBottom:'1px solid #ddd'}}>
                        <ReactToPrint
                            trigger={() => <a style={{cursor:'pointer'}}> <i className="fa fa-print"></i>  </a>}
                            content={() => this.componentRef}
                        />
                    </div>
                    <div>
                        <TemplateOrder ref={el => (this.componentRef = el)} />
                    </div>
                </div>
            </ViewModal>
        );
    }
}

PrintForm.defaultProps = {
    onToggle:()=>{},
    data:{}
}

export default PrintForm
