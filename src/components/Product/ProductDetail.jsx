import React, { Component } from "react";

class ProductDetail extends Component {
  state = {
    image: null
  };

  componentDidMount() {
    this.setState({ image: this.props.product.mainImage });
  }
  render() {
    const { product } = this.props;
    if (product) {
      return (
        <div className="col-md-6 mb-1">
          <div className="card ml-0" style={{ width: "25rem" }}>
            <img
              className="card-img-top"
              src={this.state.image}
              alt="product"
            />
            <div className="card-deck">
              {product.images.map((img, i) => (
                <div className="card" key={i}>
                  <img
                    src={img}
                    className="card-img-top"
                    alt="product"
                    onClick={() => this.setState({ image: img })}
                  />
                </div>
              ))}
            </div>
            <h1>{JSON.stringify(this.state.product)}</h1>
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">{product.sizes.join(",")}</p>
              <p className="card-text"> Rp. {product.price} </p>
              <button className="btn btn-primary">
                <i className="fa fa-cart-plus" /> Buy
              </button>
              <div
                className="wishlist"
                style={{
                  display: "inline",
                  paddingTop: "10px",
                  cursor: "pointer"
                }}
              >
                <i
                  className="ml-3 far fa-heart fa-2x"
                  onClick={() => alert("clickes")}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading ...</h1>;
    }
  }
}

export default ProductDetail;
