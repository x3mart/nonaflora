import PropTypes from "prop-types";
import React from "react";
import ProductGridTwo from "./ProductGridTwo";
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";
import { connect } from "react-redux";
import {getProducts} from "../../helpers/product";

const NewProductGrid = ({ category, limit, home_page }) => {
  return (
    <div className="product-area section-padding-1">
      <div className="container-fluid">
        <SectionTitleTwo
          titleText={home_page.accessory_block.title}
          subTitleText=""
          positionClass="text-center"
          spaceClass="mb-60"
        />
        <div className="row four-column" style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto'}}>
          <ProductGridTwo
            category={category}
            limit={limit}
            spaceBottomClass="mb-25"
          />
        </div>
      </div>
    </div>
  );
};

NewProductGrid.propTypes = {
  category: PropTypes.string,
  limit: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  return {
    home_page: state.homePageReducer.home_page,
  };
};

export default connect(mapStateToProps)(NewProductGrid);
