import React from "react";

import { Link } from "react-router-dom";

const LeftMenu = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-header">Menu</div>
      <ul className="list-group list-group-flush">
        <Link className="list-group-item" to="/cms/category">
          Category
        </Link>
        <Link className="list-group-item" to="/cms/product">
          Product
        </Link>
      </ul>
    </div>
  );
};

export default LeftMenu;
