import React, { Component } from "react";

import { createCategory } from "../../../store/actions/categoryAction";
import { connect } from "react-redux";
import CategoryList from "./CategoryList";

class CategoryAdd extends Component {
  state = {
    categoryName: "",
    image: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSbmitHandler = e => {
    e.preventDefault();
    this.props.createCategory(this.state);
    this.setState({ categoryName: ''})
  };

  render() {
    return (
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <CategoryList />
      </div>
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
