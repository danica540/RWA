import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import RecommendedBooks from './components/RecommendedBooks';
import { rootReducer } from './store';
import ListsComponent from './components/ListsComponent';

const store=createStore(rootReducer);

class Routes extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar></Navbar>
            <Switch>
            {/* <Route exact path="/" component={BookList}></Route> */}
            <Route exact path="/" component={ErrorPage}></Route>
            <Route exact path="/books" component={BrowseComponent} />
            <Route path="/sign-in" component={SignInComponent} />
            <Route path="/sign-up" component={SignUpComponent} />
            <Route exact path="/books/undefined" component={ErrorPage} />
            <Route exact path="/books/:book_id" component={BookInfo} />
            <Route exact path="/profile/:user_id" component={ProfileComponent} />
            <Route exact path="/recommendations" component={RecommendedBooks} />
            <Route exact path="/lists" component={ListsComponent} />
            </Switch>
            {/* <Route path="*" component={ErrorPage}/> */}
          </div>
        </BrowserRouter >
      </Provider>
    );
  }
}

export default Routes;