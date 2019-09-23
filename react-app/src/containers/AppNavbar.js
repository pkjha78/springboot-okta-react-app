import React, { Component } from 'react';
import logo from '../logo.svg';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Button } from 'reactstrap';

class AppNavbar extends Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
    user: undefined
  };
  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state.csrfToken = cookies.get('XSRF-TOKEN');
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);


  }

  async componentDidMount() {
    const response = await fetch('/api/user', {credentials: 'include'});
    const body = await response.text();
    if (body === '') {
      this.setState(({isAuthenticated: false}))
    } else {
      this.setState({isAuthenticated: true, user: JSON.parse(body)})
    }
  }

  login() {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
      port = ':8080';
    }
    window.location.href = '//' + window.location.hostname + port + '/private';
  }

  logout() {

    fetch('/api/logout', {method: 'POST', credentials: 'include',
      headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
      .then(response => {
        console.log(response.logoutUrl);

        window.location.href = response.logoutUrl + "?id_token_hint=" +
          response.idToken + "&post_logout_redirect_uri=" + window.location.origin;

      });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const message = this.state.user ?
      <i style={{color: 'white' , fontSize: '12px'}}> Welcome, {this.state.user.name}! </i> :
      <i style={{color: 'white' , fontSize: '12px'}}>Please log in to manage your React Tour.</i>;
    const button = this.state.isAuthenticated ?
    <button className="btn btn-outline-secondary" onClick={this.logout}>Logout</button> :
    <button className="btn btn-outline-secondary" onClick={this.login}>Login</button>;
    const links = this.state.isAuthenticated ?
      <NavLink href="/groups">Manage React Tour</NavLink> :
      <i></i>
    return(
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/">
            <img className="img-fluid ui-applicationLogo " src={logo} alt="Tour Logo" width="50" height="50" />
            React Tour
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            {message}
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink target="_blank"
                  href="https://twitter.com/oktadev">@oktadev</NavLink>
              </NavItem>
              <NavItem>
                <NavLink target="_blank" href="https://github.com/pkjha78?tab=repositories">GitHub</NavLink>
              </NavItem>
              <NavItem>
                {links}
              </NavItem>
              <Nav className="nav navbar-nav flex-row justify-content-between ml-auto">
                <NavItem className="nav-item order-2 order-md-1">
                  <NavLink tag={Link} to="#"> </NavLink>
                </NavItem>
                <NavItem>
                  {button}
                </NavItem>
              </Nav>
            </Nav>

          </Collapse>
        </Navbar>
  )
  }
}

export default withCookies(AppNavbar);
