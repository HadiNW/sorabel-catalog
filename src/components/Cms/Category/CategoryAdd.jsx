import React, { Component } from "react";

import { createCategory } from "../../../store/actions/categoryAction";
import { connect } from "react-redux";
import CategoryList from "./CategoryList";
import NavbarCms from "../UI/NavbarCms";
import LeftMenu from "../UI/LeftMenu";

import { storage } from '../../../config/firebaseConfig'

class CategoryAdd extends Component {
  state = {
    categoryName: "",
    image: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSbmitHandler = async e => {
    e.preventDefault();
    try {
      const { image } = this.state;
      const imageRef = storage.ref("categoryImage/" + image.name);
      await imageRef.put(image);
      const url = await imageRef.getDownloadURL();
      const newCategory = {
        ...this.state,
        image: url
      };
      this.props.createCategory(newCategory);
      this.setState({
        image: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  onImageChange = e => {
    if (e.target.files[0].name === "") return;
    this.setState({ image: e.target.files[0] });
  };

  render() {
    return (
      <>
        <NavbarCms />
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-3">
              <LeftMenu />
            </div>
            <div className="col-md-9">
              <div className="container">
                <form onSubmit={this.onSbmitHandler}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoryName"
                      aria-describedby="emailHelp"
                      placeholder="Category Name"
                      onChange={this.onChangeHandler}
                      value={this.state.categoryName}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={this.onImageChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>

                <CategoryList />
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
    createCategory: category => dispatch(createCategory(category))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CategoryAdd);
