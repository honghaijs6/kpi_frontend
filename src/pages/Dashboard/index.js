
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'

import MyHeader from './Header';

import RealtimeBox from './RealtimeBox';
import TimeLine from './TimeLine';

class Dashboard extends Component{

  render(){
    return (
      <div className="animated fadeIn">
        <main style={{marginTop: 20, padding: 20, height:'89vh', overflow:'auto'}}>

            <i>đang cập nhật Timeline...</i> 
            {/*<MyHeader />

            <Row>
              <Col md={9}>
                 <TimeLine />
              </Col>
              <Col md={3}>
                <RealtimeBox />
              </Col>
            </Row>*/}

        </main>

      </div>
    )
  }
}

export default Dashboard;
