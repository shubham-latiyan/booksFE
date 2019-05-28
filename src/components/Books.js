import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getAllBooks, isLoggedIn } from './Actions';
import 'react-toastify/dist/ReactToastify.css';
import { buyBook } from './Actions';

const emitter = require('./events');

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    this.getAllBooks();
    isLoggedIn().then(res => {
      if (res != null) this.setState({ isLoggedIn: true });
    });
    emitter.addListener('logout', () => {
      this.setState({ isLoggedIn: false });
    });
  }

  getAllBooks() {
    getAllBooks().then(res => {
      if (res.success) this.setState({ books: res.data });
    });
  }

  purchaseBook(id) {
    const userId = localStorage.getItem('userId');
    const obj = {
      id,
      userId,
    };
    buyBook(obj).then(res => {
      console.log('res:', res);
      toast.success(
        'You successfully purchase the book. Details are saved in Database.!',
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      this.getAllBooks();
    });
  }

  render() {
    return (
      <div>
        <ToastContainer autoClose={6000} />
        <Container>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Book title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Units left</th>
                {this.state.isLoggedIn && <th>Buy</th>}
              </tr>
            </thead>
            {this.state.books.length > 0 &&
              this.state.books.slice().map((val, i) => (
                <tbody key={val._id}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{val.title}</td>
                    <td>{val.description}</td>
                    <td>₹{val.price}</td>
                    <td>{val.units}</td>
                    {this.state.isLoggedIn && (
                      <td>
                        <button onClick={() => this.purchaseBook(val._id)}>
                          Buy Now
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              ))}
          </Table>
        </Container>
      </div>
    );
  }
}
export default Books;
