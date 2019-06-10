
import React, { Component } from 'react';
import ViewModal from '../../../../components/ViewModal';

class PreviewForm extends Component {


    state = {
        companyInfo:{}
    }

    componentWillReceiveProps(newProps){
        this.setState({
            companyInfo:newProps.companyInfo
        });
    }

    _formatHTML(HTML){
        
        HTML = HTML.replace('[[COMPANY_LOGO]]',this.state.companyInfo['logo']);
        

        HTML = HTML.replace('[[COMPANY_NAME]]',this.state.companyInfo['name']);
        HTML = HTML.replace('[[COMPANY_ADDRESS]]',this.state.companyInfo['address']);
        HTML = HTML.replace('[[COMPANY_TAXNO]]',this.state.companyInfo['tax_no']);
        HTML = HTML.replace('[[COMPANY_PHONE]]',this.state.companyInfo['phone']);
        HTML = HTML.replace('[[COMPANY_WEBSITE]]',this.state.companyInfo['website']);
        HTML = HTML.replace('[[COMPANY_EMAIL]]',this.state.companyInfo['email']);
        


        return HTML; 
    }
    render() {

        
        let HTML = this._formatHTML(this.props[this.props.type]);
        
        

        return (
            <ViewModal {...this.props}>
                <div 
                    style={{
                        padding:"20px"
                        
                    }}
                    dangerouslySetInnerHTML={{ __html: HTML  }} 
                />
            </ViewModal>
        );
    }
}

export default PreviewForm;