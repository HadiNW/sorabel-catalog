import React, { Component } from "react";
import { connect } from "react-redux";
import Products from "../components/Product/Products";
import { getProductByCategory } from "../store/actions/productActions";
import Navbar from "../components/UI/Navbar";

class CategoryPage extends Component {
  state = {
    moreProducts: false,
    loadingInitial: true,
    loadedProducts: []
  };
  loadMore = async id => {
    const { products } = this.props;
    const lastProduct = products && products[products.length - 1];
    const nextProduct = await this.props.getProductByCategory(id, lastProduct);
    if (nextProduct && nextProduct.docs && nextProduct.docs.length <= 2) {
      this.setState({ moreProducts: false });
    }
  };

  async componentDidMount() {
    const nextProduct = await this.props.getProductByCategory(
      this.props.match.params.id
    );
    if (nextProduct && nextProduct.docs && nextProduct.docs.length > 1) {
      this.setState({
        moreProducts: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const some = this.props.products !== nextProps.products;
    if (some) {
      this.setState({
        loadedProducts: [...this.state.loadedProducts, ...nextProps.products]
      });
    }
  }
  render() {
    const { loading } = this.props;
    const { moreProducts, loadingInitial, loadedProducts } = this.state;
    return (
      <>
        <Navbar />
        <Products
          products={loadedProducts}
          laoding={loading}
          moreProducts={moreProducts}
          loadMore={() => this.loadMore(this.props.match.params.id)}
        />
      </>
    );
  }
}

const mapStateToProps = (state, thisProps) => {
  return {
    loading: state.products.loading,
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
  CategoryPage
);
