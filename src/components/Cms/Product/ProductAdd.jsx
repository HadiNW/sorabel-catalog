import React, { Component } from "react";
import ProductList from "./ProductList";
import LeftMenu from "../UI/LeftMenu";
import Navbar from "../../UI/Navbar";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import { createProduct } from "../../../store/actions/productActions";

class ProductAdd extends Component {
  state = {
    productName: "",
    productCategory: "",
    price: 0,
    mainImage: "",
    images: [],
    sizes: []
  };

  onChangeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const newProduct = {
      ...this.state,
      sizes: this.state.sizes.split(",")
    };
    this.props.createProduct(newProduct);
    this.setState({
      productName: "",
      productCategory: "",
      price: 0,
      mainImage: "",
      images: [],
      sizes: []
    });
  };
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-3">
              <LeftMenu />
            </div>
            <div className="col-md-9">
              <div className="container">
                <form onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
                    <label htmlFor="categoryName">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      placeholder="Product Name"
                      onChange={this.onChangeHandler}
                      value={this.state.productName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="Product Category"
                      onChange={this.onChangeHandler}
                      value={this.state.price}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productCategory">Category</label>
                    <select
                      id="productCategory"
                      className="custom-select"
                      onChange={this.onChangeHandler}
                      value={this.state.productCategory}
                    >
                      <option value=""  disabled>
                        please select a category
                      </option>
                      {this.props.categories &&
                        this.props.categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sizes">Available Sizes</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sizes"
                      placeholder="please use a comma (,) separator"
                      onChange={this.onChangeHandler}
                      value={this.state.sizes}
                      min="0"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>

                <ProductList />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product))
  };
};

const mapStateToProps = state => {
  return {
    categories: state.firestore.ordered.categories
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "categories" }])
)(ProductAdd);
