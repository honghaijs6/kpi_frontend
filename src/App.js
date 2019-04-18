import React, { Component } from 'react';
/*import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; */
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import './scss/filemanager.scss';
import './scss/ubuntu-style.scss';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, PushSDK } from './pages/pages';
import socket from './model/socket';

// HOOKED ;

import { preLoad } from './hook/before';


class App extends Component {

  constructor(props){
      super(props);

      this.state = {
        login:false,
        count:0
      }


  }

  componentDidMount(){
    
    preLoad('authenticate');
    socket.client.authenticate().catch((err)=>{

      preLoad('stop');
      this.setState({login:false})

    });
    
    socket.client.on('authenticated',login=>{

      preLoad('stop');

      socket.client.passport.verifyJWT(login.accessToken).then(res=>{

        socket.client.service('users').get(res.userId).then(info=>{
          // WRITE LOCAL STOREAGE
          window.USERINFO = info;
          this.setState({login});

        });

      })

    });


    socket.client.on('logout', ()=>{
      preLoad('stop');
      this.setState({login:false})
    });

  }


  render() {


      return (
        <HashRouter>

            <Switch>
              <Route  path="/404" name="Page 404" component={Page404} />
              <Route path="/500" name="Page 500" component={Page500} />
              <Route path='/pushsdk' name="Push SDK" component={PushSDK} />
              <Route path={ '/'  } name="Home" component={ this.state.login ? DefaultLayout : Login } />

            </Switch>
        </HashRouter>
      );


    //return <Login/>

  }
}

export default App;
