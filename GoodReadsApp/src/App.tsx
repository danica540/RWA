import React, { Component } from 'react';
import Routes from './Routes';
import Navbar from './components/Navbar';
import { User } from './models/User';


class App extends Component{

  render() {
    return (
      <div className="App">
        <Routes>
        </Routes>
      </div>
    );
  }
}

export default App;
