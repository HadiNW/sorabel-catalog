import React from "react";

import { Link } from "react-router-dom";

const Category = props => {
  const { categories } = props;
  return (
    <div className="container d-flex justify-content-center">
      <div className="card">
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">Categories</h5>

          <div className="row">
          <div className="col-md-3 col-sm-3 col-xs-3"></div>
          <div className="card-deck mx-1 my-2" style={{ width: "20rem",borderStyle:"none"}}>
            {categories &&
              categories.map(category => (
                <Link to={`/category/${category.id}`}  key={category.id}>
                  <div className={"card"} style={{borderStyle:"none"}}>
                    <img
                      src={category.image}
                      className="card-img-top"
                      alt="category"
                      style={{ width: "50px" }}
                    />
                    <p style={{textAlign:"center",color:"#000"}}>{category.categoryName}</p>
                  </div>
                </Link>
              ))}
          </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Category;
