import React, { Component } from "react";

import Products from "../components/Product/Products";
import Category from "../components/UI/Category";

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class Home extends Component {
  render() {
      const { categories, products } = this.props
    return (
      <div className="container">
        <div className="row">
          <Category categories={categories} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        categories: state.firestore.ordered.categories,
        products: state.firestore.ordered.products,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'categories'},
        {collection: 'products'}
    ])
) (Home);
