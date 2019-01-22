import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteCategory } from "../../../store/actions/categoryAction";

class CategoryList extends Component {
  deleteHandler = id => {
    this.props.deleteCategory(id);
  };

  render() {
    const { categories } = this.props;
    return (
      <div>
        {categories &&
          categories.map(category => (
            <li key={category.id}>
              {category.categoryName}{" "}
              <span onClick={() => this.deleteHandler(category.id)}>
                DELETE
              </span>
            </li>
          ))}
      </div>
    );
  }
}

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
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "categories" }])
)(CategoryList);
