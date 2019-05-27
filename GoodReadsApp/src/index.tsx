import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import React, { Component } from 'react';

const store = configureStore();

class Root extends Component {
  render() {
    return (
        <Provider store={store}>
          <App />
        </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
