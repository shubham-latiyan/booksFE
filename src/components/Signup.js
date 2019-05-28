import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { signUp } from './Actions';

const emitter = require('./events');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
    };
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async signUp() {
    signUp(this.state).then(res => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.data._id);
        emitter.emit('afterLogin');
        this.props.history.push('/');
      }
      // console.log('res:', res)
    });
  }

  render() {
    return (
      <Container>
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            await this.signUp();
            this.setState({ name: '', email: '', password: '' });
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>Email address</Form.Label>
            <Form.Control
              value={this.state.email}
              name="email"
              onChange={this.saveToState}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              name="password"
              onChange={this.saveToState}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button style={{ float: 'left' }} variant="primary" type="submit">
            SignUp
          </Button>
        </Form>
      </Container>
    );
  }
}
export default SignUp;
