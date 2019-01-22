import React from "react";
import Product from "./Product";

import InfiniteScroll from "react-infinite-scroller";

const Products = props => {
  const { products, moreProducts, loadMore, loading } = props;
  return (
    <div className="container d-flex justify-content-center">
      <div className="row mt-4">
        <div>
          { 
            products ?
            products.length > 0 && (
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={!loading && moreProducts}
                initialLoad={false}
                loader={
                  <div className="container" key={0}>
                    LOADING ....
                  </div>
                }
              >
                {products &&
                  products.map(product => (
                    <Product key={product.id} product={product} />
                  ))}
              </InfiniteScroll>
            )
           : (
            <div className="container mt-5">
              <h2 className="text-secondary">No product available</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
