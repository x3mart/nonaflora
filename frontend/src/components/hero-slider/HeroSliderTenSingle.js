import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import background from "../../assets/img/mainphoto2.jpg"

const HeroSliderTenSingle = ({ data, sliderClass }) => {
  return (
    <div
      className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${
        sliderClass ? sliderClass : ""
      }`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12 ml-auto">
            <div className="slider-content-3 slider-animated-1 text-center">
              <h3 className="animated">{data.title}</h3>
              <h1 className="animated main-title-nf">{data.subtitle}</h1>
              <p className="animated">{data.text}</p>
              <div className="slider-btn btn-hover">
                <a
                  className="animated"
                  href={data.url}
                >
                  КУПИТЬ ПОДПИСКУ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderTenSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderTenSingle;
