import React, { Component } from "react";

import Category from "../components/UI/Category";

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Navbar from "../components/UI/Navbar";

class Home extends Component {
  render() {
      const { categories } = this.props
    return (
      <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <Category categories={categories} />
        </div>
      </div>
      </>
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
