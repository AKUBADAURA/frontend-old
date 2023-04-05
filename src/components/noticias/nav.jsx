import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ categories }) => {
  return (
      <div className="row navigation w-100">

          <div className="col-8 offset-4">
            <ul className="navbar-nav d-flex flex-row justify-content-between">
              {categories.map((category) => {
                return (
                  <li key={category.id} className="nav-item">
                    <Link to= {`/categoria-noticias-cpli/${category.id}`}>
                      {category.nombre}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
      </div>
  );
};

export default Nav;
