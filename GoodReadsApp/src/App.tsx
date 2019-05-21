import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import Navbar from './components/Navbar';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import { BrowserRouter, Route, RouteProps } from "react-router-dom";

class App extends Component {
  render() {
    return (
      
        <BrowserRouter>
        <div>
          <Navbar/>
          <Route path="/sign-in" component={SignInComponent}/>
          <Route path="/sign-up" component={SignUpComponent} />
          
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
