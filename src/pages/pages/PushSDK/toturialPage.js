import React from 'react';

import { Table, Row, Col } from 'reactstrap';

export default class ToturialPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:'tutorialPage',

    }

  }
  render() {
    return (
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
        <div className="guidebook">

            <h3> Tài liệu về Device Command Code </h3>

            <h5> 1. Add / Update data </h5>
            <p> - Cấu trúc lệnh  : DATA UPDATE tablename parameter1=value1$(HT)parameter2=value2$(HT)parameter3=value3 </p>
              
            <ul>
              <li>  TableName : Tên table trên thiết bị   </li>
              <li>  parameter  : các field trên table của thiết bị, đối chiếu thêm ở bảng bên dưới  </li>
              <li>  VD : DATA UPDATE user CardNo= Pin=1 Password=234 Group=0 StartTime=0 EndTime=0 Name=SuperAuthorize=0 </li>
            </ul> 
              
            
              
            <h5> 2. Delete Data : </h5>
            <p> - Cấu trúc lệnh : DATA DELETE $(TableName) $(Condition) </p>

            <ul>
              <li> + TableName : table name on device  </li>
              <li> + Condition    :  điều kiện :  </li>
              <li> 
                  <ul>
                      <li> - Format : parameter1=value1$(HT)parameter2=value2$(HT)parameter3=value3 </li>
                      <li> - Nếu format : * là tất cả  </li>
                  </ul> 
                  
              </li>
              <li> + VD : 	DATA DELETE user Pin=1 </li>
            </ul>
               
              
           <h5> 3. Count Data : </h5>
           <p>  - Cấu trúc command : DATA COUNT $(TableName) $(Coditions) </p>
           <ul>
              <li>+ TableName : table name on device  </li>
              <li>   + Condition    :  điều kiện :  </li>
           </ul>
            
            
            
           <h5> 4. Query Data  </h5> 
           <p> - Cấu trúc command : :DATA QUERY tablename=$(XXX),fielddesc=$(XXX),filter=$(XXX) </p>   
           <ul>
              <li>  + TableName : table name on device  </li>
              <li> + fielddesc :  các trường của bảng trên thiết bị  :  </li>
              <li>  
                  <ul>
                    <li> - trường hợp : fielddesc=* 	// không có điều kiện </li>
                    <li>  - trường hơp : fielddesc=“NewRecord” và tablename=transaction // nó chỉ lấy những transaction mới nhất  </li>
                    <li> - trường hợp : fielddesc=“starttime= \t endtime=”  // nó chỉ lấy  trong khoản thời gian  </li>
                  </ul>
              </li>
              <li> + filter : điều kiện  </li>
              <li> VD : DATA QUERY tablename=user,fielddesc=*,filter=*  // Lấy tất cả record của table user  </li>
           </ul> 
              

            </div>

      </div>
    );
  }
}
