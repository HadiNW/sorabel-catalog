import React from "react";
import Product from "./Product";

import InfiniteScroll from "react-infinite-scroller";

const Products = props => {
  const { products, moreProducts, loadMore  } = props;
  return (
    <div className="container d-flex justify-content-center">
      <div className="row mt-4">
        {products && products.length > 0 && (
          <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={moreProducts} initialLoad={false} >
            {products &&
              products.map(product => (
                <Product key={product.id} product={product} />
              ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Products;
