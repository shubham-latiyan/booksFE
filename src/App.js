import React from 'react';
import logo from './logo.svg';
import SignUp from './components/Signup';
import Header from './components/Header';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Books from './components/Books';
import AddBooks from './components/AddBooks';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Books} exact />
          <Route path="/signup" render={props => <SignUp {...props} />} />
          <Route path="/addbook" component={AddBooks} />
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
