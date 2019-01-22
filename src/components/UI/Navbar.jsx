import React from "react";

import { Link, NavLink } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
       
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" style={{margin:"0 auto", width:"25rem"}}>           
            <li className="nav-item" style={{marginLeft: "0"}}>
              <span className="nav-link">   <i className="ml-3 fas fa-arrow-left fa-lg" /> </span>
            </li>
            <li className="nav-item">
              <Link to="/cms/category" className="nav-link">
                Link
              </Link>
            </li>

            <li className="nav-item" style={{marginLeft:"auto", padding:0, marginRight:"0"}}>
              <span className="nav-link">   <i className="ml-3 far fa-heart fa-lg" /> </span>
            </li>
            <li className="nav-item" style={{marginLeft:"0", padding:0, marginRight:"0"}}>
              <span className="nav-link">   <i className="ml-3 fas fa-cart-plus fa-lg" /> </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
