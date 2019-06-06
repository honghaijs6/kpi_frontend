import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg' ;

import { Link } from 'react-router-dom';


import Socket from '../../model/socket';



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props){
    super(props);

    this.state = {
      userInfo:{}
    }

    this._logout = this._logout.bind(this);

  }

  _logout(){

    Socket.client.logout();

  }
  componentDidMount(){

    this.setState({
      userInfo:window.USERINFO
    });


  }


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const avatar = this.state.userInfo.photoURL  || 'https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2F31.jpg?alt=media';

    return (
      <React.Fragment>

        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand
          full={{ src: logo,  height: 45 }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />

        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* LEFT  */}
        <Nav navbar>
          <NavItem className="px-3">
              Tháng 06
          </NavItem>
        </Nav>


        {/* RIGHT */}
        <Nav className="ml-auto" navbar>

          
          <AppHeaderDropdown className="px-3  " direction="down">

            <DropdownToggle nav>
              <img src={avatar} className="img-avatar" /> 
              <span className="caret"> 
                { window.USERINFO.name }
                <i className="ml-10 fa fa-caret-down"></i>
              </span>
            </DropdownToggle>

            <DropdownMenu right style={{ right: 'auto' }}>

              <DropdownItem>
                <Link to="/profile">
                  <i className="fa fa-user"></i> Tài khoản
                </Link>
              </DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Thiết lập </DropdownItem>

              <DropdownItem onClick={this._logout} ><i className="fa fa-lock"></i> Đăng xuất </DropdownItem>
            </DropdownMenu>

          </AppHeaderDropdown>

          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="font-18 fa fa-globe"></i><Badge pill color="danger"></Badge></NavLink>
          </NavItem>
          
        </Nav>

        <AppAsideToggler className="d-md-down-none" />

        {<AppAsideToggler className="d-lg-none" mobile />}

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
