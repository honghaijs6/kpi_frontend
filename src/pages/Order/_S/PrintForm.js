import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';



import ViewModal from '../../../components/ViewModal';
import TemplateOrder from '../../../prints/TemplateOrder';
import TemplateQuotation from '../../../prints/TemplateQuotation'; 

class PrintForm extends Component {  

    
    createPDF(){

    }
    render() {
        
        const data = this.props.data;
        
        return (
            <ViewModal name={ <span className="text-uppercase"> {data.code_pi || data.code} </span> }  { ...this.props }  onToggle={(isOpen)=>{  this.props.onToggle(isOpen)}} >
                <div>
                    
                    <div style={{padding:10}}>
                        <div className="btn-group">
                        
                            <ReactToPrint
                                trigger={() => <a className="btn btn-normal"> <i className="fa fa-print mr-5"></i> Báo giá </a>}
                                content={() => this.componentRefQuotation}
                            />
                            
                            <ReactToPrint
                                trigger={() => <a className="btn btn-normal"> <i className="fa fa-print mr-5"></i> Đơn hàng  </a>}
                                content={() => this.componentRefOrder}
                            />
                            
                        </div>
                        
                    </div>
                    <div style={{padding:'40px 0px'}}>
                        <TemplateQuotation data={data}  ref={el => (this.componentRefQuotation = el)} />
                        <div style={{display:'none'}}>
                            <TemplateOrder data={data} ref={el => (this.componentRefOrder = el)} />
                        </div>
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
