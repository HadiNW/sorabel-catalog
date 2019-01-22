import React, { Component } from "react";

import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/UI/Navbar";
import HomePage from "./containers/HomePage";
import CategoryPage from "./containers/CategoryPage";
import ProductDetailPage from './containers/ProductDetailPage'

import CategoryAdd from './components/Cms/Category/CategoryAdd'
import ProductAdd from './components/Cms/Product/ProductAdd'

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
                <Route exact path="/cms/category" component={CategoryAdd} />
                <Route exact path="/cms/product" component={ProductAdd} />
              </Switch>
            </>
          </Router>   
      </Provider>
    );
  }
}

export default App;
