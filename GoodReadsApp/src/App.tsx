import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import Navbar from './components/Navbar';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import { BrowserRouter, Route, RouteProps, Switch, RouteComponentProps } from "react-router-dom";
import BookList from './components/BookList';
import BookInfo from './components/BookInfo';
import ErrorPage from './components/ErrorPage';

class App extends Component {

  render() {
    return (

      <BrowserRouter>
          <div>
          <Navbar/>
          <BookList></BookList>
          {/* <Route exact path="/"  component={SignInComponent} /> */}
          <Route path="/sign-in" component={SignInComponent}/>
          <Route path="/sign-up" component={SignUpComponent} />
          <Route path="/books/:book_id" component={BookInfo}/>
          <Route path="*" component={ErrorPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
