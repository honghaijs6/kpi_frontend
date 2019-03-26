import React from 'react';

import { BenExplorer } from '../../../components/BenExplorer';

import IntroPage from './introPage';
import DevicePage from './devicePage';
import PersonPage from './personPage';
import TimeSegmentPage from './timeSegmentPage';
import AccessLevelPage from './accessLevelPage';
import TransactionPage from './transactionPage';
import RealtimePage from './realtimePage';


class PushSDKContent extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      onTab:'devicePage',
      navData:[
        {icon:'', code:'introPage',name:'Giới thiệu'},
        {icon:'', code:'settingDevicePage',name:'Cấu hình thiết bị'},
        {icon:'', code:'devicePage',name:'Devices',active:true},
        {icon:'', code:'personPage',name:'Môi trường Sanbox'},
        {icon:'', code:'timeSegmentPage',name:'Realtime'},

        
      ]
    }

    this._onNavChange = this._onNavChange.bind(this);
    this.viewSupport = this.viewSupport.bind(this);

  }

  /* WHEN */

  viewSupport(){
     this._whereStateChange({
       onAction:'viewSupport'
     })
  }

  _onNavChange(code){
    this._whereStateChange({
      onTab:code
    })
  }
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render() {
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0,height: '89vh'}}>
        <main>
          <BenExplorer style={{
            border:0,
            height: '89vh',

          }} onLeftSideChange={ this._onNavChange } data={this.state.navData} >

            <div style={{
              backgroundColor: '#F0F3F5',
              height: 44,
              lineHeight: '44px',
              paddingLeft: 15,
              borderBottom:'1px solid #ddd'
            }}>
              <div className="pull-left">
                {
                  this.state.navData.map((item,index)=>{
                    if(item.code===this.state.onTab){
                      return(
                        <span key={index} style={{
                            fontSize: 15,
                            color:'#18A689',
                            fontWeight: 500
                          }}> { item.name } </span>
                      )
                    }


                  })
                }
              </div>
              <div className="pull-right" style={{paddingRight: 15}} >
                <button onClick={this.viewSupport} className="btn btn-sm btn-success"> <i className="fa fa-support mr-5" /> Hướng dẩn </button>
              </div>
            </div>


            <div style={{padding: 15}}>
              <IntroPage {...this.state } />
              <DevicePage {...this.state}  />
              <PersonPage {...this.state} />
              <TimeSegmentPage {...this.state} />
              <AccessLevelPage {...this.state} />
              <TransactionPage {...this.state} />
              <RealtimePage {...this.state} />

            </div>

          </BenExplorer>
        </main>
        </div>
      </div>
    );
  }
}

export default PushSDKContent;
