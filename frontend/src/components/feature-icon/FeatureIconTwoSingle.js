import PropTypes from "prop-types";
import React from "react";

const FeatureIconTwoSingle = ({ data, spaceBottomClass, textAlignClass }) => {
  return (
    <div className="col-md-4">
      <div
        className={`support-wrap-2 support-shape ${
          spaceBottomClass ? spaceBottomClass : ""
        } ${textAlignClass ? textAlignClass : ""}`}
      >
        <div className="support-content-2">
          <div className="p-3" style={{backgroundRepeat: 'no-repeat', backgroundSize:'contain', backgroundPosition:'center', backgroundImage:`url(${data.bg_image})`, width:'100%', height:'100%'}}>
            <img
            className="animated"
            src={data.icon}
            alt=""
          />
          </div>
          <h5 dangerouslySetInnerHTML={{__html: data.title}}/>
          <p dangerouslySetInnerHTML={{__html: data.text}}/>
        </div>
      </div>
    </div>
  );
};

FeatureIconTwoSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  textAlignClass: PropTypes.string
};

export default FeatureIconTwoSingle;
