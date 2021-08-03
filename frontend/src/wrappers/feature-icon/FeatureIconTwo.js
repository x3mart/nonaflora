import PropTypes from "prop-types";
import React from "react";
import featureIconData from "../../data/feature-icons/feature-icon-two.json";
import FeatureIconTwoSingle from "../../components/feature-icon/FeatureIconTwoSingle.js";
import bg from "../../assets/img/Pattern_example_beige_wide_beige.png"

const FeatureIconTwo = ({ spaceTopClass, spaceBottomClass, data }) => {
  return (
    <div
      className={`support-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row feature-icon-two-wrap">
          {data &&
            data.map((single, key) => {
              return (
                <FeatureIconTwoSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  textAlignClass="text-center"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

FeatureIconTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FeatureIconTwo;
