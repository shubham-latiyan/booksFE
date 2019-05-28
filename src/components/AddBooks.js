import React, { Component } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { saveBooks } from './Actions';

class AddBooks extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      title: '',
      description: '',
      price: '',
      units: 0,
    };
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async addBooks() {
    console.log('state', this.state);
    saveBooks(this.state).then(res => {
      console.log('res:', res);
      if (res.success) {
        console.log('cccccccccccccccc');

        return <Redirect to="/" />;
        // this.setState({

        // })
      }
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await this.addBooks();
              this.setState({
                name: '',
                title: '',
                description: '',
                price: '',
                units: 0,
              });
            }}
          >
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter book title"
                onChange={this.saveToState}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows="3"
                placeholder="Enter book description"
                onChange={this.saveToState}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                placeholder="Enter book price"
                onChange={this.saveToState}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>No. of units</Form.Label>
              <Form.Control
                name="units"
                type="number"
                placeholder="Enter book no. of units"
                onChange={this.saveToState}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export default AddBooks;
