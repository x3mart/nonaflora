import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      {/*<nav>*/}
      {/*  <ul>*/}
      {/*    <li>*/}
      {/*      <Link to={process.env.PUBLIC_URL + "/"}>*/}
      {/*        Главная*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link to={process.env.PUBLIC_URL + "/shop"}>*/}
      {/*        Купить*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link to={process.env.PUBLIC_URL + "/about"}>*/}
      {/*        О нас*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link to={process.env.PUBLIC_URL + "/contact"}>*/}
      {/*        Контакты*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</nav>*/}
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenu);
