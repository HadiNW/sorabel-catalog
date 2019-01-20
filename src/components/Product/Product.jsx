import React from "react";

import { Link } from 'react-router-dom' 

const Product = (props) => {
    const { productName, price, images, mainImage, sizes, id } = props.product
  return (

    <div className="col-md-6 mb-1">
      <div className="card ml-0" style={{ width: "25rem" }}>
       <Link to={`/category/${id}`}>
        <img
            className="card-img-top"
            src={mainImage}
            alt="product"
            />
       </Link>
        
        <div className="card-body">
          <h5 className="card-title"><Link style={{color: 'black', textDecoration: 'none'}} to={`/category/${id}`}>{productName}</Link></h5>
          <p className="card-text">{sizes.join(',')}</p>
          <p className="card-text"> Rp. {price} </p>
          <button className="btn btn-primary">
            <i className="fa fa-cart-plus" /> Buy
          </button>
          <div className="wishlist" style={{display: 'inline', paddingTop: '10px', cursor: 'pointer'}}>
            <i className="ml-3 far fa-heart fa-2x" onClick={() => alert('clickes')} />
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
    productCard: {
        width: '80%'
    }
}
export default Product;
