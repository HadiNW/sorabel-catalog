import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteCategory } from "../../../store/actions/categoryAction";

const CategoryList = props => {
  
  const { categories } = props;
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">Image</th>
          <th scope="col">Act</th>
        </tr>
      </thead>
      <tbody>
        {categories &&
          categories.map((category, i) => (
            <tr key={category.id}>
              <td>{i + 1}</td>
              <td>{category.categoryName}</td>
              <td><img style={{width: '100px'}} src={category.image} alt="category"/></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => props.deleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.firestore.ordered.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: id => dispatch(deleteCategory(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "categories" }])
)(CategoryList);
