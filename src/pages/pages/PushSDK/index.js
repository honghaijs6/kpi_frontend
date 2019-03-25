import React from 'react';

import { Nav, NavItem, NavLink, Container } from 'reactstrap';


/* lib load*/
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';


import Content from './content';

class PushSDK extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (

      <div className="app">
        <AppHeader
          style={{
            backgroundColor: '#18A689',
            borderBottom:0
          }}
        >
          <Nav navbar>
            <NavItem className="px-3" style={{
              fontFamily: 'Roboto',
              fontSize: 20,
              fontWeight: 500,
              color: '#fff'
            }}>
                PUSH SDK
            </NavItem>
          </Nav>

        </AppHeader>
        
        <div className="app-body">

            <main className="main">
              <Container fluid style={{padding: 0}}>
                <Content  />
              </Container>
            </main>

        </div>

        <AppFooter>
          <span>
            <div className="avatars-stack mt-2">
              <div className="avatar avatar-xs">
                <img src={'assets/img/avatars/2.jpg'} className="img-avatar" id="user-avatar" />
              </div>
            </div>
           </span>

          <span className="ml-20" id="users-activities">  </span>

          <span className="ml-auto"> &copy; 2018   Code with <i className='fa fa-heart'> </i> </span>

        </AppFooter>


      </div>

    );
  }
}

export default PushSDK;
