import React, { Component } from "react";

class ProductDetail extends Component {
  state = {
    image: null
  };

  componentDidMount() {
    this.setState({ image: this.props.product.mainImage });
  }
  render() {
    const previewClass = "card";
    const { product } = this.props;
    if (product) {
      return (
        <div className="col-md-6 mb-1 d-flex justify-content-center">
          <div className="card ml-0" style={{ width: "25rem" }}>
            <img
              className="card-img-top"
              src={this.state.image}
              alt="product"
            />
            <div className="card-deck mx-1 my-2">
              {product.images.map((img, i) => (
                <div
                  style={{ maxWidth: "5rem" }}
                  className={`${previewClass} ${img === this.state.image &&
                    "border-success"}`}
                  key={i}
                >
                  <img
                    src={img}
                    className="card-img-top"
                    alt="product"
                    onClick={() => {
                      this.setState({ image: img });
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">{product.sizes.join(",")}</p>
              <p className="card-text"> Rp. {product.price} </p>
              <div className="row">
                <button className="btn btn-primary">
                  <i className="fa fa-cart-plus" /> Buy
                </button>
                <i className="ml-3 far fa-heart fa-2x" />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-5">
          <h3 className="text-secondary">Loading ..</h3>
        </div>
      );
    }
  }
}

export default ProductDetail;
