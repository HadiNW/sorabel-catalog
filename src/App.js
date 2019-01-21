import React, { Component } from "react";

import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/UI/Navbar";
import HomePage from "./containers/HomePage";
import CategoryPage from "./containers/CategoryPage";
import ProductDetailPage from './containers/ProductDetailPage'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/category/:id" component={CategoryPage} />
                <Route exact path="/product/:id" component={ProductDetailPage} />
              </Switch>
            </>
          </Router>   
      </Provider>
    );
  }
}

export default App;
