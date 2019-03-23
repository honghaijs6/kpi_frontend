import React, { Component } from 'react';
/*import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; */
import { HashRouter, Route } from 'react-router-dom';
import './App.scss';

import './scss/filemanager.scss';
import './scss/ubuntu-style.scss';



// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login } from './pages/pages';
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
    // Try to authenticate with the JWT stored in localStorage
    //const users = client.service('users');

    /* listening error */

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
          

        });


      })

      
      this.setState({login});

      

    });


    socket.client.on('logout', ()=>{
      preLoad('stop');
      
      this.setState({login:null})
    });

  }


  render() {


      return (
        <HashRouter>


            {
               this.state.login ? (<Route path="/" name="Home" component={DefaultLayout} />) : (<Route exact name="Login Page" component={Login} />)
            }


        </HashRouter>
      );


    //return <Login/>

  }
}

export default App;
