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

class App extends Component {

  render() {
    return (

      <BrowserRouter>
          <div>
          <Navbar/>
          {/* <BookList/> */}
          {/* <Route exact path="/"  component={SignInComponent} /> */}
          <Route path="/sign-in" component={SignInComponent} />
          <Route path="/sign-up" component={SignUpComponent} />
          <Route path="/:book_id" component={BookInfo}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
