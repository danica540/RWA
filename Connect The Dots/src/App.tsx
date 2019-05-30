import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CanvasComponent from './components/CanvasComponent';
import PaintComponent from './components/PaintComponent';


class App extends Component{

  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Switch>
            <Route exact path="/" component={PaintComponent}></Route>
            <Route exact path="/connect_the_dots" component={CanvasComponent}></Route>
            </Switch>
        </BrowserRouter >
      </div>
    );
  }
}

export default App;
