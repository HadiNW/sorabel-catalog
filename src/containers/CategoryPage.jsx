import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Products from "../components/Product/Products";
import { getProductByCategory } from "../store/actions/productActions";

import firebase from "../config/firebaseConfig";

class CategoryPage extends Component {
  state = {
    moreProducts: false,
    loading: true,
    loadedProducts: []
  };
  loadMore = async id => {
    const { products } = this.props;
    const lastProduct = products && products[products.length - 1];
    console.log(lastProduct, "LAST");
    const nextProduct = await this.props.getProductByCategory(id, lastProduct);
    if (nextProduct && nextProduct.docs && nextProduct.docs.length <= 1) {
      this.setState({ moreProducts: false });
    }
  };

  componentDidMount() {
    this.props.getProductByCategory(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.products !== nextProps.products) {
      this.setState({
        loadedProducts: [...this.state.loadedProducts, ...nextProps.products],
        moreProducts: true,
        loading: false
      });
    }
  }
  render() {
    const { moreProducts, loading, loadedProducts } = this.state;
    return (
      <>
        <Products
          products={loadedProducts}
          laoding={loading}
          moreProducts={moreProducts}
          loadMore={this.loadMore}
        />
      </>
    );
  }
}

const mapStateToProps = (state, thisProps) => {
  console.log(state);
  return {
    // products: state.firestore.ordered.products,
    products: state.products.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductByCategory: (id, lastProduct) =>
      dispatch(getProductByCategory(id, lastProduct))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // firestoreConnect(props => [
  //   {
  //     collection: "products",
  //     where: ["productCategory", "==", props.match.params.id]
  //   }
  // ])
  CategoryPage
);
