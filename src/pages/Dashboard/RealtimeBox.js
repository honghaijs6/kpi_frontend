import React, { Component, StyleSheet } from 'react';
import { Row, Col } from 'reactstrap';

import classnames from 'classnames';

class RealtimeBox extends Component{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render(){

    return(
      <div className="box-realtime-activity" style={{position: 'relative', width: '100%', top: 0}}>
        <div className="nav-tabs-custom" id="task-holder">

            <ul className="nav nav-tabs">
              <li className="active" title="Hoạt động">
                <a><i className="fa fa-list-alt"></i></a>
              </li>
              <li title="Nhắc việc">
                <a>
                  <i className="fa fa-bell-o"></i>
                  <span style={{position: 'relative', top: -10, left: -5, paddingBottom:2, paddingTop: 4, paddingLeft: 4, paddingRight: 6}} className="badge badge-danger badge-pill">12</span>
                </a>
              </li>
              <li id="li-penalize" title="DS Phạt" >
                <a><i className="fa fa-legal"></i> </a>
              </li>

          </ul>

          <div className="slimScrollDiv">
            <div className="tab-content" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 600}}>
                <div className="tab-pane chat active" id="chat-box">
                  <div className="item">
                    <img src="http://kpi.vikhang.com:9000/files/kpi.vikhang.com/HCM-OFVK18014/photos/14.jpg" className="online myname" />
                    <p className="message">
                      <a href="#!" className="name myname">
                        <small className="text-muted pull-right">
                          <i className="fa fa-clock-o"></i> 11:19:44
                          </small> Nguyễn Ngọc Uẩn
                      </a>
                      asdads
                    </p>
                  </div>
                </div>
            </div>
          </div>


        </div>

      </div>
    )
  }
}

export default RealtimeBox ;
