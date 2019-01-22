import React, { Component } from "react";
import ProductList from "./ProductList";
import LeftMenu from "../UI/LeftMenu";
import Navbar from "../../UI/Navbar";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import { createProduct } from "../../../store/actions/productActions";

import { storage } from "../../../config/firebaseConfig";
import FileUploader from "react-firebase-file-uploader";

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
  onMainImageChange = e => {
    console.log(e.target.files[0].name);
    this.setState({ mainImage: e.target.files[0] });
  };

  onImagesChange = e => {
    console.log(e.target.files);
    this.setState({ images: e.target.files });
  };

  uploadImage = () => {};

  onSubmitHandler = async e => {
    e.preventDefault();
    try {
      const { mainImage, images } = this.state;
      const mainImageRef = storage.ref("productImage/" + mainImage.name);

      const imagesURL = [];
      for (let i = 0; i < images.length; i++) {
        const imgRef = storage.ref("productImage/" + images[i].name);
        await imgRef.put(images[i]);
        imagesURL.push(await imgRef.getDownloadURL());
      }

      await mainImageRef.put(mainImage);
      const url = await mainImageRef.getDownloadURL();
      const newProduct = {
        ...this.state,
        mainImage: url,
        images: imagesURL,
        sizes: this.state.sizes.split(",")
      };
      this.props.createProduct(newProduct);
      this.setState({
        productName: "",
        productCategory: "",
        price: 0,
        mainImage: "",
        progress: "",
        images: [],
        sizes: []
      });
    } catch (err) {
      console.log(err);
    }
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
                      <option value="" disabled>
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
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mainImage">Main Image</label>
                    <input type="file" onChange={this.onMainImageChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mainImage">Other Image</label>
                    <input
                      type="file"
                      multiple
                      onChange={this.onImagesChange}
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
