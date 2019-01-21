import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
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
    console.log('=== REQUESTING ===')
    const { products } = this.props;
    const lastProduct = products && products[products.length - 1];
    console.log(lastProduct, 'LASP')
    const nextProduct = await this.props.getProductByCategory(id, lastProduct);
    console.log(nextProduct.docs.length, "NEXT P  <= 1");
    if (nextProduct && nextProduct.docs && nextProduct.docs.length <= 2) {
      this.setState({ moreProducts: false });
    }
    console.log(this.state.moreProducts, 'MMMMM')
  };

  async componentDidMount() {
    const nextProduct = await this.props.getProductByCategory(this.props.match.params.id)
    console.log(nextProduct.docs.length, "NEXT P  >>>>= 1");
    if (nextProduct && nextProduct.docs && nextProduct.docs.length > 1) {
      this.setState({
        moreProducts: true,
        loadingInitial: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const some = this.props.products !== nextProps.products
    console.log(some, 'xxxx SOME xxxx')
    if (some) {
      this.setState({
        loadedProducts: [...this.state.loadedProducts, ...nextProps.products]
      });
    }
  }
  render() {
    const { loading } = this.props
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
  console.log(state);
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
  // firestoreConnect(props => [
  //   {
  //     collection: "products",
  //     where: ["productCategory", "==", props.match.params.id]
  //   }
  // ])
  CategoryPage
);
