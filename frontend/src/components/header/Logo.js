import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/NF_Logo_2.png"

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        {/*<div style={{fontSize:25, fontWeight:700}}>N&F</div>*/}
        <img alt="" src={logo} width="187,5px" height="75px"/>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
