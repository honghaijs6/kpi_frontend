
import React, { Component } from 'react';

import {BenExplorer} from '../../../components/BenExplorer';


import ProductPage from './productPage';
import CategoryPage from './categoryPage';
import SupplierPage from './supplierPage';
import CauseDelPage from './causeDelPage';

import SettingOrderPage from './settingOrderPage';
import NotificationPage from './notificationPage';
import UnitPage from './unitPage';





class OrderSetting extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      onTab:'productPage',
      navData:[
        {icon:'', code:'productPage',name:'Sản phẩm',active:true},
        {icon:'', code:'categoryPage',name:'Danh mục sản phẩm'},
        {icon:'', code:'supplierPage',name:'Nhà Cung Cấp'},
        {icon:'', code:'causeDelPage',name:'Lý do huỷ đơn hàng'},
        {icon:'', code:'settingOrderPage',name:'Cấu hình tạo đơn hàng'},
        {icon:'', code:'notificationPage',name:'Cài đặt thông báo'},
        {icon:'', code:'unitPage',name:'Đơn vị tính'},
      ]
    }

    this._onNavChange = this._onNavChange.bind(this);

  }

  /* WHEN */
  _onNavChange(code){
    this._whereStateChange({
      onTab:code
    })
  }
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }

  render(){
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, marginTop: 20}}>
            <main>
              <BenExplorer onLeftSideChange={ this._onNavChange } data={this.state.navData} >

                <ProductPage {...this.state} />
                <CategoryPage {...this.state} />
                <SupplierPage {...this.state} />
                <CauseDelPage {...this.state} />
                <SettingOrderPage {...this.state} />
                <NotificationPage {...this.state} />
                <UnitPage {...this.state} /> 
        

              </BenExplorer>
            </main>
        </div>
      </div>
    )
  }
}

export default OrderSetting;
