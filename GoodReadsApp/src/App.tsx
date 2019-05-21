import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import Navbar from './components/Navbar';
import Header from './components/Header';
import BookList from './components/BookList';
import SignInComponent from './components/SignInComponent';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <SignInComponent></SignInComponent>
      </div>
    );
  }
}

export default App;
