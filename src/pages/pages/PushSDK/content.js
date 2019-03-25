import React from 'react';

import { BenExplorer } from '../../../components/BenExplorer';

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
        {icon:'', code:'devicePage',name:'Devices',active:true},
        {icon:'', code:'personPage',name:'Persons Operation'},
        {icon:'', code:'timeSegmentPage',name:'Time Segment'},
        {icon:'', code:'accessLevelPage',name:'Access Level'},
        {icon:'', code:'transactionPage',name:'Transactions'},
        {icon:'', code:'realtimePage',name:'Realtime'},
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
              Home
            </div>
            <div style={{padding: 15}}>
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
