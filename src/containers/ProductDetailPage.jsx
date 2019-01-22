import React, { Component } from "react";
import ProductDetail from "../components/Product/ProductDetail";
import Navbar from "../components/UI/Navbar";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class ProductDetailPage extends Component {
  state = {
    load: false
  };

  componentWillReceiveProps(nextState) {
    this.setState({ load: true });
  }
  render() {
    const { product } = this.props;

    return (
      <>
        {this.state.load ? (
          <>
            <Navbar props={this.props} url={"product"} />
            <div className="container  d-flex justify-content-center mt-4">
              <ProductDetail product={product && product[0]} />
            </div>
          </>
        ) : (
          <div className="container mt-5">
            <h3 className="text-secondary">Loading ..</h3>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    product: state.firestore.ordered.products
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: "products", doc: props.match.params.id }
  ])
)(ProductDetailPage);
