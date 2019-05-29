import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CanvasComponent from './components/CanvasComponent';


class App extends Component{

  render() {
    return (
      <div className="App">
        <CanvasComponent></CanvasComponent>
        <BrowserRouter>
            <Switch>
            {/* <Route exact path="/" component={CanvasComponent}></Route> */}
            </Switch>
        </BrowserRouter >
      </div>
    );
  }
}

export default App;
