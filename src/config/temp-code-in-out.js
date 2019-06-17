export const MAU_PHIEU_XUATKHO = `
<!doctype html>
<html lang='en'>
    <head>  
        <meta charset='utf-8'>  
        <title>Print Preview</title>
        <meta name='description' content='Print preview'>
            <style type='text/css'>
                .vendorListHeading th{ font-size: 12px !important;  border: 0px solid #111 !important; border-right: 1px solid #000 !important;}

                p.N2T{ text-transform:lowercase;}
                p.N2T:first-child:first-letter {
                    text-transform: uppercase !important;


                }

 
                @page {
                    size:'A4';
                    margin: 0;
                    margin-top: 1cm;
                }

                @media print {
                    

                    body {
                        
                        padding:0;
                        line-height: 1.4em;
                        word-spacing:1px;
                        letter-spacing:0.2px;
                        font: 12px Arial;
                        color: #000; -webkit-print-color-adjust: exact;
                        background: #fff !important;

                    }
                   

                    @page:top{
                        margin-top: 2cm !important;
                    }


                }

                
                td.company-info p{
                    padding-left: 90px;
                    font-size: 10px;
                    line-height: 10px;
                    font-family: 'Arial'; color: #121212 !important;
                }
                .row-page-name{ font-size: 14px; font-weight: bold; line-height: 12px; margin-top: 30px;}
                

                .print-table{ border: 1px solid #333; font-size: 12px;}
                .print-table .record-item td.item{ border: 0.5px solid #333;}
                .print-table .record-item td.item-footer{ border-bottom: 0.5px solid #333;}


                .print-table .record-border td{ border-top: 1px solid #333;}
                .print-table .record-last td{ border-top: 1px solid #333; }

                .print-table th{ font-size: 14px; font-weight: normal;}
                .print-table td{ font-size: 12px;}
                
                .conditions{font-size: 12px; margin-top: 30px;}
                .conditions p{ line-height: 5px;  margin-bottom: 10px; }
                .conditions label{
                    font-size: 12px; 
                    margin: 0px; padding: 0px; font-weight: normal !important;
                    line-height: 18px;
                }

                .table-term{margin-top: 20px}
                .table-term tr td{ padding: 3px 0px; font-size: 12px; }


                .signature{ font-size: 12px; margin-top: 20px;}
                .signature p.cus{ line-height: 5px;}
                
            </style>
    </head>
    <body style='background:#fff'>
        <div id="doc-pdf" class="print-document" style="padding: 0px; width: 92%; margin: auto;">
                <div>
                    <div style="float: left; width: 25%;">
                            
                    <img src="{{COMPANY_LOGO}}" style="height: 127px;">
                </div>
                <div style="float: left; width: 65%; padding-left: 40px;">
                    <p style="font-size: 14px; margin: 0px; padding: 5px 0px; font-weight: 500;"> {{COMPANY_NAME}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> {{COMPANY_ADDRESS}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> MST : {{COMPANY_TAXNO}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Tel: {{COMPANY_PHONE}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Website: {{COMPANY_WEBSITE}} - E-mail: {{COMPANY_EMAIL}} </p>
                </div>
                <div style="float: left; width: 10%; text-align: right;">
                    <img src="http://kpi.vikhang.com:9000/js/app/cpanel/img/brand.jpg" style="height: 127px;">
                </div>
                
                <div style="clear: both;"></div>


            </div>
            <div style="margin-top: 30px; position: relative;">
                <div>
                    <div style="text-align: center;">
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> PHIẾU XUẤT KHO </p>
                    </div>
                    <div style="position: absolute; right: 0px; top: -10px;">
                        {{BARCODE}}
                    </div>
                </div>
                <div style="margin-top: 30px;">
                    <div style="float: left; width: 63%; border: 0px solid rgb(0, 0, 0); padding: 10px;">
                        <table style="border: 1px solid rgb(0, 0, 0); padding: 10px 0px;">
                            <tbody>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Company <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;"> 
                                        {{CUSTOMER_NAME}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Address (Địa chỉ) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_ADDRESS}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Tel (SĐT) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_PHONE}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">Email <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_EMAIL}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Attn(Người nhận) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_RECEIVER}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        MST/Tax Code <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_TAXNO}}
                                    </td>
                                </tr>

                                
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-left: 1%; float: left; width: 36%;">
                        <table>
                            <tbody>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Phiếu xuất <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{RECEIPT_CODE_OUT}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Ngày/Date <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{RECEIPT_DATE_CREATED}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        T.liệu T.K <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ RECEIPT_ORDER_INV }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                       Mã kho <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_PAYMENT_CODE}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;"> Carton <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;"></td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Kích thươc/Size <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
            <div class="page" style="margin-top: 30px;">
                <table class="table print-table">
                    <thead>
                        <tr class="vendorListHeading">
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">No STT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 120px; font-family: Arial;">Model / Mã hàng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 290px; font-family: Arial;">Name / Tên hàng hoá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Unit / ĐVT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Q.ty / S.lượng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Unit Price / Đơn giá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Amount / Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody style="border: 1px solid rgb(0, 0, 0);">
                        {{ORDER_RECORDS}}
                    </tbody>
                   
                </table>
            </div>
            <div class="conditions ">
                <p class="font-12"> Ghi chú / <i>Noted</i> : {{ RECEIPT_NOTE }}</p>
            </div>

            <div class="signature" style="margin-top:40px;">
                <table>
                    <tr>
                        <td style="width: 400px; ">
                            <p class="bold">Khách hàng/Cus  </p>
                            <br> <br> <br><br>
                            Ghi rõ họ tên<br>
                            Ngày/Date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người giao/Del  </p>
                            <br> <br> <br><br>
                            Người giao hàng<br>
                            Ngày/date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người xuất kho/Exp  </p>
                            <br> <br> <br><br>
                            {{ USER_CODE }} <br>
                            Ngày/date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người bán/Sale  </p>
                            <br> <br> <br><br>
                            {{ ORDER_BELONG_USER }}<br>
                            Ngày/date
                        </td>
                    </tr>  
                </table>
            </div>
        </div>
    </body>
</html>
`;


export const MAU_PHIEU_NHAPKHO = `
<!doctype html>
<html lang='en'>
    <head>  
        <meta charset='utf-8'>  
        <title>Print Preview</title>
        <meta name='description' content='Print preview'>
            <style type='text/css'>
                .vendorListHeading th{ font-size: 12px !important;  border: 0px solid #111 !important; border-right: 1px solid #000 !important;}

                p.N2T{ text-transform:lowercase;}
                p.N2T:first-child:first-letter {
                    text-transform: uppercase !important;


                }

 
                @page {
                    size:'A4';
                    margin: 0;
                    margin-top: 1cm;
                }

                @media print {
                    

                    body {
                        
                        padding:0;
                        line-height: 1.4em;
                        word-spacing:1px;
                        letter-spacing:0.2px;
                        font: 12px Arial;
                        color: #000; -webkit-print-color-adjust: exact;
                        background: #fff !important;

                    }
                   

                    @page:top{
                        margin-top: 2cm !important;
                    }


                }

                
                td.company-info p{
                    padding-left: 90px;
                    font-size: 10px;
                    line-height: 10px;
                    font-family: 'Arial'; color: #121212 !important;
                }
                .row-page-name{ font-size: 14px; font-weight: bold; line-height: 12px; margin-top: 30px;}
                

                .print-table{ border: 1px solid #333; font-size: 12px;}
                .print-table .record-item td.item{ border: 0.5px solid #333;}
                .print-table .record-item td.item-footer{ border-bottom: 0.5px solid #333;}


                .print-table .record-border td{ border-top: 1px solid #333;}
                .print-table .record-last td{ border-top: 1px solid #333; }

                .print-table th{ font-size: 14px; font-weight: normal;}
                .print-table td{ font-size: 12px;}
                
                .conditions{font-size: 12px; margin-top: 30px;}
                .conditions p{ line-height: 5px;  margin-bottom: 10px; }
                .conditions label{
                    font-size: 12px; 
                    margin: 0px; padding: 0px; font-weight: normal !important;
                    line-height: 18px;
                }

                .table-term{margin-top: 20px}
                .table-term tr td{ padding: 3px 0px; font-size: 12px; }


                .signature{ font-size: 12px; margin-top: 20px;}
                .signature p.cus{ line-height: 5px;}
                
            </style>
    </head>
    <body style='background:#fff'>
        <div id="doc-pdf" class="print-document" style="padding: 0px; width: 92%; margin: auto;">
                <div>
                    <div style="float: left; width: 25%;">
                            
                    <img src="{{COMPANY_LOGO}}" style="height: 127px;">
                </div>
                <div style="float: left; width: 65%; padding-left: 40px;">
                    <p style="font-size: 14px; margin: 0px; padding: 5px 0px; font-weight: 500;"> {{COMPANY_NAME}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> {{COMPANY_ADDRESS}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> MST : {{COMPANY_TAXNO}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Tel: {{COMPANY_PHONE}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Website: {{COMPANY_WEBSITE}} - E-mail: {{COMPANY_EMAIL}} </p>
                </div>
                <div style="float: left; width: 10%; text-align: right;">
                    <img src="http://kpi.vikhang.com:9000/js/app/cpanel/img/brand.jpg" style="height: 127px;">
                </div>
                
                <div style="clear: both;"></div>


            </div>
            <div style="margin-top: 30px; position: relative;">
                <div>
                    <div style="text-align: center;">
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> PHIẾU XUẤT KHO </p>
                    </div>
                    <div style="position: absolute; right: 0px; top: -10px;">
                        {{BARCODE}}
                    </div>
                </div>
                <div style="margin-top: 30px;">
                    <div style="float: left; width: 63%; border: 0px solid rgb(0, 0, 0); padding: 10px;">
                        <table style="border: 1px solid rgb(0, 0, 0); padding: 10px 0px;">
                            <tbody>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Company <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;"> 
                                        {{CUSTOMER_NAME}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Address (Địa chỉ) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_ADDRESS}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Tel (SĐT) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_PHONE}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">Email <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_EMAIL}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Attn(Người nhận) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_RECEIVER}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        MST/Tax Code <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_TAXNO}}
                                    </td>
                                </tr>

                                
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-left: 1%; float: left; width: 36%;">
                        <table>
                            <tbody>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Phiếu xuất <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{RECEIPT_CODE_OUT}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Ngày/Date <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{RECEIPT_DATE_CREATED}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        T.liệu T.K <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ RECEIPT_ORDER_INV }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                       Mã kho <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_PAYMENT_CODE}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;"> Carton <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;"></td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Kích thươc/Size <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
            <div class="page" style="margin-top: 30px;">
                <table class="table print-table">
                    <thead>
                        <tr class="vendorListHeading">
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">No STT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 120px; font-family: Arial;">Model / Mã hàng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 290px; font-family: Arial;">Name / Tên hàng hoá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Unit / ĐVT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Q.ty / S.lượng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Unit Price / Đơn giá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Amount / Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody style="border: 1px solid rgb(0, 0, 0);">
                        {{ORDER_RECORDS}}
                    </tbody>
                   
                </table>
            </div>
            <div class="conditions ">
                <p class="font-12"> Ghi chú / <i>Noted</i> : {{ RECEIPT_NOTE }}</p>
            </div>

            <div class="signature" style="margin-top:40px;">
                <table>
                    <tr>
                        <td style="width: 400px; ">
                            <p class="bold">Khách hàng/Cus  </p>
                            <br> <br> <br><br>
                            Ghi rõ họ tên<br>
                            Ngày/Date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người giao/Del  </p>
                            <br> <br> <br><br>
                            Người giao hàng<br>
                            Ngày/date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người xuất kho/Exp  </p>
                            <br> <br> <br><br>
                            {{ USER_CODE }} <br>
                            Ngày/date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người bán/Sale  </p>
                            <br> <br> <br><br>
                            {{ ORDER_BELONG_USER }}<br>
                            Ngày/date
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
</html>
`;