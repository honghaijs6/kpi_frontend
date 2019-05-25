import React, { Component } from 'react';
import '../scss/print.scss';


class TemplateOrder extends Component {

    constructor(props){
        super(props);

        this.grid = {
            colums:[
                { headerName:'No STT', width:41 },
                { headerName:'Model / Mã hàng', width:120 },
                { headerName:'Description / Chi tiết hàng hoá', width:290 },
                { headerName:'Unit / ĐVT', width:41 },
                { headerName:'Photo / Hình ảnh', width:90 },
                { headerName:'Q.ty / S.lượng', width:41 },
                { headerName:'Unit Price / Đơn giá', width:90 },
                { headerName:'Amount / Thành tiền', width:90 },
            ],
            rows:[
                {
                    stt:'1',
                    name:'asdasd',
                    desc:`
                        <ul>
                            <li>Màn&nbsp;hình&nbsp;(<em>Display)</em>:&nbsp;2.4-inch&nbsp;TFT&nbsp;LCD&nbsp;Color&nbsp;Screen</li>
                            <li>Dung&nbsp;lượng&nbsp;vân&nbsp;tay&nbsp;(<em>Fingerprint&nbsp;Capacity</em>):&nbsp;3000</li>
                            <li>Dung&nbsp;lượng&nbsp;thẻ&nbsp;&nbsp;(<em>Card&nbsp;Capacity</em>):&nbsp;5000</li>
                            <li>Dung&nbsp;lượng&nbsp;giao&nbsp;dịch&nbsp;(<em>Transaction&nbsp;Capacity</em>):100,000</li>
                            <li>Cảm&nbsp;biến&nbsp;(<em>Sensor</em>):&nbsp;SilkID&nbsp;Sensor</li>
                            <li>Phiên&nbsp;bản&nbsp;thuật&nbsp;toán&nbsp;(<em>Algorithm&nbsp;Version</em>):ZKFinger&nbsp;VX10.0</li>
                            <li>Kết&nbsp;nối&nbsp;(<em>Communication</em>):&nbsp;RS232/485,&nbsp;TCP/IP,&nbsp;USB-host</li>
                            <li>Giao&nbsp;thức&nbsp;điều&nbsp;khiển&nbsp;truy&nbsp;cập&nbsp;(<em>Access&nbsp;Control&nbsp;Interface</em>):&nbsp;3rd&nbsp;Party&nbsp;Electric&nbsp;Lock,&nbsp;Door&nbsp;Sensor,&nbsp;Exit&nbsp;Button,&nbsp;Alarm,&nbsp;Doorbell,&nbsp;Wiegand&nbsp;Signal&nbsp;Input,&nbsp;Output,SRB,&nbsp;Aux.&nbsp;Input&nbsp;1ea&nbsp;for&nbsp;linkage&nbsp;function</li>
                            <li>Chức&nbsp;năng&nbsp;chính<em>&nbsp;(Functions)</em>:&nbsp;DST,Automatic&nbsp;Status&nbsp;Switch,&nbsp;Anti-passback,Scheduled-Bell,Printer&nbsp;&amp;&nbsp;Wireless&nbsp;door&nbsp;bell.</li>
                            <li>Nguồn&nbsp;điện&nbsp;(<em>Power&nbsp;Supply</em>):&nbsp;12V&nbsp;DC,3A</li>
                            <li>Hoạt&nbsp;động&nbsp;ở&nbsp;nhiệt&nbsp;độ&nbsp;(<em>Operating&nbsp;Temperature</em>):&nbsp;0&nbsp;°C-&nbsp;45&nbsp;°C</li>
                            <li>Hoạt&nbsp;động&nbsp;ở&nbsp;độ&nbsp;ẩm&nbsp;(<em>Operating&nbsp;Humidity</em>):&nbsp;20%-80%</li>
                            <li>SDK&nbsp;and&nbsp;Phần&nbsp;mềm&nbsp;tương&nbsp;thích&nbsp;(<em>Software</em>):&nbsp;Standalone&nbsp;SDK,&nbsp;ZKAccess3.5&nbsp;software</li>
                        </ul>
                    `,
                    unit:'asd',
                    photo:'',
                    amount:'12',
                    price:'12,000',
                    total:'12,000 đ'
                },
                {
                    stt:'2',
                    name:'asdasd',
                    desc:`
                        <ul>
                            <li>Màn&nbsp;hình&nbsp;(<em>Display)</em>:&nbsp;2.4-inch&nbsp;TFT&nbsp;LCD&nbsp;Color&nbsp;Screen</li>
                            <li>Dung&nbsp;lượng&nbsp;vân&nbsp;tay&nbsp;(<em>Fingerprint&nbsp;Capacity</em>):&nbsp;3000</li>
                            <li>Dung&nbsp;lượng&nbsp;thẻ&nbsp;&nbsp;(<em>Card&nbsp;Capacity</em>):&nbsp;5000</li>
                            <li>Dung&nbsp;lượng&nbsp;giao&nbsp;dịch&nbsp;(<em>Transaction&nbsp;Capacity</em>):100,000</li>
                            <li>Cảm&nbsp;biến&nbsp;(<em>Sensor</em>):&nbsp;SilkID&nbsp;Sensor</li>
                            <li>Phiên&nbsp;bản&nbsp;thuật&nbsp;toán&nbsp;(<em>Algorithm&nbsp;Version</em>):ZKFinger&nbsp;VX10.0</li>
                            <li>Kết&nbsp;nối&nbsp;(<em>Communication</em>):&nbsp;RS232/485,&nbsp;TCP/IP,&nbsp;USB-host</li>
                            <li>Giao&nbsp;thức&nbsp;điều&nbsp;khiển&nbsp;truy&nbsp;cập&nbsp;(<em>Access&nbsp;Control&nbsp;Interface</em>):&nbsp;3rd&nbsp;Party&nbsp;Electric&nbsp;Lock,&nbsp;Door&nbsp;Sensor,&nbsp;Exit&nbsp;Button,&nbsp;Alarm,&nbsp;Doorbell,&nbsp;Wiegand&nbsp;Signal&nbsp;Input,&nbsp;Output,SRB,&nbsp;Aux.&nbsp;Input&nbsp;1ea&nbsp;for&nbsp;linkage&nbsp;function</li>
                            <li>Chức&nbsp;năng&nbsp;chính<em>&nbsp;(Functions)</em>:&nbsp;DST,Automatic&nbsp;Status&nbsp;Switch,&nbsp;Anti-passback,Scheduled-Bell,Printer&nbsp;&amp;&nbsp;Wireless&nbsp;door&nbsp;bell.</li>
                            <li>Nguồn&nbsp;điện&nbsp;(<em>Power&nbsp;Supply</em>):&nbsp;12V&nbsp;DC,3A</li>
                            <li>Hoạt&nbsp;động&nbsp;ở&nbsp;nhiệt&nbsp;độ&nbsp;(<em>Operating&nbsp;Temperature</em>):&nbsp;0&nbsp;°C-&nbsp;45&nbsp;°C</li>
                            <li>Hoạt&nbsp;động&nbsp;ở&nbsp;độ&nbsp;ẩm&nbsp;(<em>Operating&nbsp;Humidity</em>):&nbsp;20%-80%</li>
                            <li>SDK&nbsp;and&nbsp;Phần&nbsp;mềm&nbsp;tương&nbsp;thích&nbsp;(<em>Software</em>):&nbsp;Standalone&nbsp;SDK,&nbsp;ZKAccess3.5&nbsp;software</li>
                        </ul>
                    `,
                    unit:'asd',
                    photo:'',
                    amount:'12',
                    price:'12,000',
                    total:'12,000 đ'
                }

            ]
        }
    }
    render() {
        return (
            <div className="print-document" style={{padding:'30px 0px', width:'92%', margin:'auto'}}>

                {/* TITLE */}
                <div>
                    <div style={{float:'left', width:'25%'}}>
                        <img style={{height:127}} src="http://kpi.vikhang.com:9000/js/app/cpanel/img/kpi.vikhang.com-logo.jpg" />
                    </div>
                    <div style={{float:'left', width:'65%', paddingLeft:40}}>
                        <p style={{fontSize:14, margin:0, padding:'5px 0', fontWeight:'500'}}>CÔNG TY TNHH TM DV THIẾT BỊ KỸ THUẬT VI KHANG</p>
                        <p style={{fontSize:12, margin:0, padding:'5px 0'}}> Tòa nhà Rivergate, Tháp B, 151-155 Bến Vân Đồn, Phường 6, Q.4, TP.HCM </p>
                        <p style={{fontSize:12, margin:0, padding:'5px 0'}}> MST : 0310820281 </p>
                        <p style={{fontSize:12, margin:0, padding:'5px 0'}}> Tel: 02873000779 - Fax: 02838267063 - Hotline: 19006976 </p>
                        <p style={{fontSize:12, margin:0, padding:'5px 0'}}> Website: www.vikhang.com - E-mail: info@vikhang.com </p>
                    </div>
                    <div style={{float:'left', width:'10%', textAlign:'right'}}>
                        <img src="http://kpi.vikhang.com:9000/js/app/cpanel/img/brand.jpg" style={{height:127}} />
                    </div>
                    <div style={{clear:'both'}}></div>
                </div>

                {/* HEADER */}
                <div style={{marginTop:30, position:'relative'}}>
                    <div>
                        <div style={{textAlign:'center'}}>
                            <p style={{margin:0, padding:'5px 0px', fontSize:16, fontWeight:'500'}}> QUOTATION </p>
                            <p style={{margin:0, padding:'5px 0px', fontSize:16, fontWeight:'500'}}> BẢNG BÁO GIÁ </p>
                        </div>
                        <div style={{position:'absolute',right:0, top:0}}>
                            <img src="/assets/img/barcode.jpg"  />
                        </div>
                    </div>

                    <div style={{marginTop:30}}>
                        <div style={{
                            float:'left',
                            width:'63%',
                            border:'0px solid #000',
                            padding:10
                        }}>
                            <table style={{border:'1px solid #000', padding:'10px 0px'}}>
                                <tbody>
                                    <tr>
                                        <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'9px 10px'}}> 
                                            Company  <span style={{padding:'0px 10px'}}> : </span> 
                                        </td>
                                        <td style={{width:'100%', fontSize:12, padding:'9px 10px'}}>
                                            CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI DỊCH VỤ ĐÔNG TRẦN 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                            Address (Địa chỉ) <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                            88/16( số cũ: 18/8B Đường số 4, Phường 16, Quận Gò Vấp), Quận 12, TP. Hồ Chí Minh
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                            Tel (SĐT) <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                            0902 681634
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                            FAX <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                            0902 681634
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                            Email <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                            hnh305@gmail.com
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'9px 10px'}}> 
                                            Attn(Người nhận) <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{width:'100%', fontSize:12, padding:'9px 10px'}}>
                                            Mr Huy
                                        </td>
                                    </tr>
                                </tbody>
                            
                            </table>
                        </div>  
                        <div style={{
                            marginLeft:'1%',
                            float:'left',
                            width:'36%',
                        }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                        Number <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{border:'1px solid #000', width:'100%', padding:3,fontSize:12}}>
                                            VK-201905-169
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                            Date  <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                            2019-05-25 10:58:06
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                            Old Ref(Tài liệu TK Cũ)  <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                            2019-05-25 10:58:06
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                            Ref.(T.Gia T.Khảo)  <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                            2019-05-25 10:58:06
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                            A/C code  <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                            HCM-OFVK18014
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                            Term(Hạn thanh toán)  <span style={{padding:'0px 10px'}}> : </span>  
                                        </td>
                                        <td style={{border:'1px solid #000', width:'100%',padding:3, fontSize:12}}>
                                            PT001
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{clear:'both'}}></div>
                    </div>

                </div>

                {/* END HEADER */}

                {/* BODY TABLE */}
                <div style={{marginTop:30}}>
                    <table className="table print-table">       
                        <thead >
                            <tr className="vendorListHeading">
                                {
                                    this.grid.colums.map((item,index)=>{
                                        return(
                                            <th key={index} className="text-center" style={{
                                                verticalAlign:'middle',
                                                fontSize:17,
                                                color:'#111',
                                                width: item.width,
                                                fontFamily:'Arial' 
                                            }}>
                                                { item.headerName }
                                            </th>
                                        )
                                    })
                                }   

                            </tr>
                        </thead>
                        <tbody style={{border:'1px solid #000'}}>
                            {
                                this.grid.rows.map((item,index)=>{
                                    return (
                                        <tr key={index} className="record-item">

                                            <td className="text-center item" style={{
                                                verticalAlign:'middle'
                                            }}>
                                                { item.stt }
                                            </td>

                                            <td className="text-center item" style={{
                                                verticalAlign:'middle'
                                            }}>
                                                { item.name }
                                            </td>
                                            <td className="item-pro-desc item">
                                                <div style={{wordWrap:'break-word', width: this.grid.colums[2]['width'] }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                                            </td>
                                            <td className="text-center item" style={{
                                                verticalAlign:'middle'
                                            }}>
                                                { item.unit }
                                            </td>
                                            <td className="text-center item" style={{
                                                verticalAlign:'middle'
                                            }}>
                                                <img style={{maxHeight:72}} className="img-responsive" src="http://kpi.vikhang.com:9000/files/kpi.vikhang.com/takumi/photos/NrQU97Karu.jpg?v=536193" />
                                            </td>
                                            <td className="text-center item" style={{
                                                verticalAlign:'middle'
                                            }}>
                                                { item.amount }
                                            </td>
                                            <td className="text-center item" style={{
                                                verticalAlign:'middle'
                                            }}>
                                                { item.price }
                                            </td>
                                            <td className="text-center item" style={{
                                                verticalAlign:'middle'
                                            }}>
                                                { item.total }
                                            </td>
                                            
                                            
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                       
                        
                    </table>
                </div>       
                {/* END BODY TABLE */}


            </div>

        );
    }
}

export default TemplateOrder ; 
