import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUser } from './Actions';

const emitter = require('./events');

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token') != null) {
      this.setState({ isLoggedIn: true });
    }
    this.getUser();

    emitter.addListener('afterLogin', () => {
      this.setState({ isLoggedIn: true });
      this.getUser();
    });
    emitter.addListener('logout', () => {
      this.setState({ isLoggedIn: false });
    });
  }

  getUser() {
    getUser(localStorage.getItem('userId')).then(res => {
      // console.log('res00:', res)
      if (res.success) {
        if (res.data.isAdmin) this.setState({ isAdmin: true });
      }
    });
  }

  logOut() {
    emitter.emit('logout');
    this.setState({ isLoggedIn: false });
    this.setState({ isAdmin: false });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  render() {
    return (
      <header style={{ backgroundColor: 'aliceblue' }}>
        <Navbar bg="dark" variant="dark">
          <Link to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </Link>
          {!this.state.isLoggedIn && (
            <Link to="/login">
              <Navbar.Brand>Login</Navbar.Brand>
            </Link>
          )}
          {!this.state.isLoggedIn && (
            <Link to="/signup">
              <Navbar.Brand>SignUp</Navbar.Brand>
            </Link>
          )}
          {this.state.isAdmin && (
            <Link to="/addbook">
              <Navbar.Brand>Add Books</Navbar.Brand>
            </Link>
          )}
          {this.state.isLoggedIn && (
            <Link to="/">
              <Navbar.Brand
                onClick={() => this.logOut()}
                style={{ float: 'right' }}
              >
                Log Out
              </Navbar.Brand>
            </Link>
          )}
        </Navbar>
      </header>
    );
  }
}
