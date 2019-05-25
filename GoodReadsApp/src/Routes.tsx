import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import BookInfo from './components/BookInfo';
import ErrorPage from './components/ErrorPage';
import BrowseComponent from './components/BrowseComponent';
import ProfileComponent from './components/ProfileComponent';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './store/reducer';

const store=createStore(reducer);

class Routes extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar></Navbar>
            <Route exact path="/" component={BookList}></Route>
            <Route exact path="/books" component={BrowseComponent} />
            <Route path="/sign-in" component={SignInComponent} />
            <Route path="/sign-up" component={SignUpComponent} />
            <Route exact path="/books/:book_id" component={BookInfo} />
            <Route exact path="/profile/:user_id" component={ProfileComponent} />
            {/* <Route path="*" component={ErrorPage}/> */}
          </div>
        </BrowserRouter >
      </Provider>
    );
  }
}

export default Routes;