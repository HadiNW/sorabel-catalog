import React from "react";

import { Link } from "react-router-dom";

function NavbarCms() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <span className="nav-link">
                <i className="ml-3 fas fa-arrow-left fa-lg" />{" "}
              </span>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCms;
