import React, { Component, StyleSheet } from 'react';
import { Row, Col } from 'reactstrap';


class RealtimeBox extends Component{

  constructor(props) {
    super(props);


    this.state = {

      activeTab: '1',
      tabs:[
        {
          icon:'fa fa-list-alt',
          code:'1',
          name:'Hoạt động'
        },
        {
          icon:'fa fa-bell-o',
          code:'2',
          name:'Nhắc việc'
        },
        {
          icon:'fa fa-legal',
          code:'3',
          name:'DS Phạt'
        }
      ]
    };


  }

  _onChangeTab(code){
    this.setState({
      activeTab:code
    });

  }
  render(){



    return(
      <div className="box-realtime-activity" style={{position: 'relative', width: '95%', top: 0}}>
        <div className="nav-tabs-custom" id="task-holder">

            <ul className="nav nav-tabs" style={{ borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
              <li>
                <a>  RealTime logs</a>
              </li>

            </ul>

            <div className="slimScrollDiv">
              <div style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '80vh'}}>

                  <div className={` tab-pane chat active `} id="chat-box" style={{ marginTop:14, marginLeft:7}}>
                    <div className="item" style={{ lineHeight:'8px'}}>

                      <div className="float-left">
                        <label className="font-17 text-green">
                            Benjamin HD
                        </label>
                        <span>  #SN:09090  @event  </span>
                        <br />
                        <small><i className="fa fa-ticket"></i>0908980236</small>

                      </div>
                      <div className="float-right">
                         <small>11:00</small>
                      </div>


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
