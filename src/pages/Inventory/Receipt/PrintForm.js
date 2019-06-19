
// DATA 
import { PHIEU_XUATKHO, PHIEU_NHAPKHO } from '../../../config/temp-code-in-out-basic';
import {  WAREHOUSE_TRACKS } from '../../../config/app.config';

// HOOKS 
import doGetModelInfoCode from '../../../hook/ultil/doGetModelInfoCode';



import {N2T} from '../../../hook/ultil/N2T'; 
import React, { Component } from 'react';

import ReactToPrint from 'react-to-print';
import moment from 'moment';
import numeral from 'numeral';


import ViewModal from '../../../components/ViewModal';


class PrintForm extends Component {  

    
    state = {
        companyInfo:{},
        warehouseInfo:{},
        purchaseInfo:{}

    }

    async componentWillReceiveProps(newProp){

        if(JSON.stringify(newProp.companyInfo)!='{}'){
            this.setState(newProp.companyInfo);

            if(JSON.stringify(newProp.data)!=='{}'){
                

                const resWHInfo = await doGetModelInfoCode('warehouses',newProp.data.warehouse_code);
                if(resWHInfo.name==='success'){

                    this.setState({
                        warehouseInfo : resWHInfo.data
                    });

                    
                }

                const resPurInfo = await doGetModelInfoCode('purchases',newProp.data.purchase_code);
                if(resPurInfo.name==='success'){
                    this.setState({
                        purchaseInfo:resPurInfo.data
                    })
                }
                
            }

        }
    }

    _getTrackCode(code){
        let name = '';
        const MY_TRACKCODE = WAREHOUSE_TRACKS['in'].concat(WAREHOUSE_TRACKS['out']);

        MY_TRACKCODE.map((item)=>{
            if(item.code===code){
                name = item.name;
            }
        });

        return name;

    }


    // USING FOR REDER BASIC
    _renderBodyCart(cart){
        let html = ``;
        cart.map((item,index)=>{
            const total = parseFloat(item.price) * parseInt(item.amount);
            const stt = index + 1; 

            html += `
                <tr class="record-item">
                    <td class="text-center item" style="vertical-align:middle">
                        ${stt}
                    </td>
                    
                    <td class="text-center item" style="vertical-align:middle" >
                        ${ item.code }
                    </td>
                    <td class="item-pro-desc item" style="word-wrap:break-word;">
                       ${item.name  }
                    </td>

                    <td class="text-center item" style="vertical-align:middle">
                        ${ item.unit || '' }
                    </td>

                    
                    <td class="text-center item" style="vertical-align:middle">
                        ${ item.amount }
                    </td>
                </tr>
            `
        });

        return html;
    }
    

     _renderPOBody(HTML, data){
        
        // SUPPLIER INFO
        const supInfo = JSON.parse(data.supplier_info);
        HTML = HTML.replace(/{{SUPPLIER_CODE}}/g, supInfo.code );
        HTML = HTML.replace(/{{SUPPLIER_NAME}}/g, supInfo.name );
        HTML = HTML.replace(/{{SUPPLIER_ADDRESS}}/g, supInfo.address );
        HTML = HTML.replace(/{{SUPPLIER_TAXNO}}/g, supInfo.tax_no );
        HTML = HTML.replace(/{{SUPPLIER_PHONE}}/g, supInfo.phone  );
        HTML = HTML.replace(/{{SUPPLIER_EMAIL}}/g, supInfo.email || 'n/a' );
        // END SUPPLIER INFO

        // RECEIP INFO 
        HTML = HTML.replace(/{{PURCHASE_CODE}}/g, data.purchase_code );
        HTML = HTML.replace(/{{WAREHOUSE_CODE}}/g, data.warehouse_code );
        
        // END RECEIPT INFO 

        // SHIP TO 
        if(JSON.stringify(this.state.warehouseInfo) !=='{}'){
            
            HTML = HTML.replace(/{{RECEIVER_LOCATION}}/g, this.state.warehouseInfo.name );
            HTML = HTML.replace(/{{RECEIVER_ADDRESS}}/g, this.state.warehouseInfo.address );
            HTML = HTML.replace(/{{RECEIVER_CONTACT}}/g, this.state.warehouseInfo.contact_person + ' - '+ this.state.warehouseInfo.phone );
            

        }
        // END SHIP TO

        // PURCHASE INFO 
        if(JSON.stringify(this.state.purchaseInfo)!=='{}'){
            const purInfo = this.state.purchaseInfo;
            

            HTML = HTML.replace(/{{PURCHASE_BELONG_USERCODE}}/g, purInfo.user_code );
            HTML = HTML.replace(/{{PURCHASE_PAYMENT}}/g, purInfo.payment_code );
            HTML = HTML.replace(/{{PURCHASE_BELONG_USERNAME}}/g, purInfo.creator );
            HTML = HTML.replace(/{{PURCHASE_BELONG_USERMAIL}}/g, purInfo.creator_email );

            // 
            HTML = HTML.replace(/{{BARCODE}}/g, `<img style="height:60px" src="https://barcode.tec-it.com/barcode.ashx?data=${ purInfo.code.toUpperCase() }"/>`);
                
            
        }
        // END PURCHASE

        const cart = JSON.parse(data.cart);  
        HTML = HTML.replace(/{{ORDER_RECORDS}}/g,  this._renderBodyCart(cart) ); 
        HTML = HTML.replace(/{{RECEIPT_NOTE}}/g,  data.note );
        


        return HTML;

    }

    _renderBasic(HTML,data){
        

        HTML = HTML.replace(/{{RECEIP_TRACK_CODE}}/g, this._getTrackCode(data.track_code) );
        HTML = HTML.replace(/{{RECEIP_ATTACH}}/g, this._getTrackCode(data.attack_code) );
        HTML = HTML.replace(/{{RECEIPT_NOTE}}/g, this._getTrackCode(data.note));
        
        HTML = HTML.replace(/{{RECEIPT_DATE_CREATED}}/g,  moment(data.date_created).format('YYYY-MM-DD') );
        HTML = HTML.replace(/{{RECEIPT_CODE_OUT}}/g,  data.code_out );
        HTML = HTML.replace(/{{RECEIPT_CODE_IN}}/g,  data.code_in );
        
        HTML = HTML.replace(/{{WAREHOUSE_CODE}}/g,  data.warehouse_code );

        const cart = JSON.parse(data.cart);  
        HTML = HTML.replace(/{{ORDER_RECORDS}}/g,  this._renderBodyCart(cart) ); 
        
        

        return HTML;
    }

    _formatHTML(data,companyInfo){
        let HTML = ``;

        if(JSON.stringify(companyInfo)!='{}'){

            // DECODE DATA
            if(JSON.stringify(data)!=='{}'){


                
                const tempBasic = {
                    in:PHIEU_NHAPKHO,
                    out:PHIEU_XUATKHO
                }

                
                switch(data.track_code){
                    case 'banhang':
                        HTML = companyInfo['receipt_out_temp'];
                        
                    break;
                    case 'muahang':
                        HTML = companyInfo['receipt_in_temp']; 
                        //alert(HTML)
                        HTML = this._renderPOBody(HTML,data);

                    break;

                    default:
                        // TEMPLATE MẪU CƠ BẢN
                        HTML = tempBasic[data.type];
                        HTML = this._renderBasic(HTML,data);
                        
                    break;
                    
                }


                HTML = HTML.replace(/{{COMPANY_LOGO}}/g,companyInfo['logo']);
                HTML = HTML.replace(/{{COMPANY_NAME}}/g,companyInfo['name']);
                HTML = HTML.replace(/{{COMPANY_ADDRESS}}/g,companyInfo['address']);
                HTML = HTML.replace(/{{COMPANY_TAXNO}}/g,companyInfo['tax_no']);
                HTML = HTML.replace(/{{COMPANY_PHONE}}/g,companyInfo['phone']);
                HTML = HTML.replace(/{{COMPANY_WEBSITE}}/g,companyInfo['website']);
                HTML = HTML.replace(/{{COMPANY_EMAIL}}/g,companyInfo['email']);

                
                //const cusInfo = JSON.parse(data.customer_info);
                



                /*

               

                const orderInfo = data ; 
                // ORDER INFO 
                
                HTML = HTML.replace(/{{ORDER_CODE_PI}}/g,orderInfo.code_pi);
                HTML = HTML.replace(/{{ORDER_CODE}}/g,orderInfo.code);
                HTML = HTML.replace(/{{ORDER_CODE_CREATED}}/g, moment(orderInfo.date_created).format('YYYY-MM-DD'));
                HTML = HTML.replace(/{{ORDER_DATE_CONFIRMED}}/g, moment(orderInfo.date_confirmed).format('YYYY-MM-DD'));

                HTML = HTML.replace(/{{ORDER_BELONG}}/g, orderInfo.belong_user);
                HTML = HTML.replace(/{{ORDER_PAYMENT_CODE}}/g, orderInfo.payment_code);

                

                HTML = HTML.replace(/{{BARCODE}}/g, `<img style="height:72px" src="https://barcode.tec-it.com/barcode.ashx?data=${ type==='quotation_temp' ? orderInfo.code.toUpperCase() : orderInfo.code_pi.toUpperCase() }"/>`);
                   
                // END ORDER INFO 

                // CART TABLE
                const cart = JSON.parse(orderInfo.cart);  
                const TOTAL_VAT = parseFloat(orderInfo['total_sum']) * ( parseInt(orderInfo['vat'])/100 ) ; 

                HTML = HTML.replace(/{{ORDER_RECORDS}}/g, type === 'quotation_temp' ? this._renderBodyQuotation(cart) : this._renderBodyOrder(cart) ); 
                HTML = HTML.replace(/{{ORDER_DISCOUNT}}/g, numeral(orderInfo.level_discount).format('0,0') );
                HTML = HTML.replace(/{{ORDER_AMOUNT}}/g, numeral(orderInfo.total_sum).format('0,0') );
                HTML = HTML.replace(/{{VAT}}/g, orderInfo.vat );
                HTML = HTML.replace(/{{ORDER_AMOUNT}}/g, numeral(orderInfo.total_sum_vat).format('0,0') );
                HTML = HTML.replace(/{{ORDER_AMOUNT_TAX}}/g, numeral(TOTAL_VAT).format('0,0') );
                HTML = HTML.replace(/{{ORDER_SUM}}/g, numeral(orderInfo['total_sum_vat']).format('0,0')+' đ' );
                HTML = HTML.replace(/{{ORDER_SUM_TEXT}}/g, N2T(orderInfo['total_sum_vat'])+' đồng' );
                // END CART TABLE

                // FOOTER INFO 
                HTML = HTML.replace(/{{ORDER_PAYMENT_DESC}}/g, orderInfo['payment_desc'] ); 
                HTML = HTML.replace(/{{ORDER_PREPARE}}/g, window.USERINFO.username ); 
                


                // END FOOTER INFO*/
                
            }
            

        }

        return HTML;
    }


    render() {
        
        const data = this.props.data;
        const HTML = this._formatHTML(data,this.props.companyInfo); //this._formatQuotationHTML(data,this.props.companyInfo);
        
       
        return (
            <ViewModal name={ <span className="text-uppercase"> form </span> }  { ...this.props }   >
                <div>
                    
                    <div style={{padding:10}}>
                        <div className="btn-group">
                        
                            <ReactToPrint
                                trigger={() => <a className="btn btn-normal btn-sm"> <i className="fa fa-print"></i></a>}
                                content={() => this.componentRef}
                            />
                            
                        </div>
                          
                    </div>
                    <div    
                        ref={el => (this.componentRef = el)}
                        style={{
                                paddingBottom:20
                        }}
                            dangerouslySetInnerHTML={{ __html: HTML  }} 
                    />

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
