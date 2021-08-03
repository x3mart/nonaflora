import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/NF_Logo_2.png";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass, year }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
        colorClass ? colorClass : ""
      }`}
    >
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={footerLogo} style={{height:75, width:'auto'}}/>
        </Link>
      </div>
      <p>
        © {year}{" "}
        <a href="/" rel="noopener noreferrer" target="_blank" className="n-f">
          Н&Ф
        </a>
        .<br /> All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
