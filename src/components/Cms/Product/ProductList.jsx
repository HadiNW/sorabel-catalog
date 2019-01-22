import React from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteProduct } from "../../../store/actions/productActions";

const ProductList = props => {
  const { products } = props;
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">proce</th>
          <th scope="col">Act</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product, i) => (
            <tr key={product.id}>
              <td>{i+1}</td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-danger" onClick={() => props.deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: id => dispatch(deleteProduct(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "products" }])
)(ProductList);
