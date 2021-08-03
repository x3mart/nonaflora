import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import {deleteFromCart} from "../../redux/actions/cartActions";
import {getFormattedPhone} from "../../helpers/phone"

const IconGroup = ({
                     currency,
                     cartData,
                     wishlistData,
                     compareData,
                     deleteFromCart,
                     iconWhiteClass,
                     home_page
                   }) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const is_empty = obj => {
    if(Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true
    } else {
      return false
    }
  }

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style d-none d-md-block w-100">
      {/*<div className="same-style d-none d-lg-block header-phone w-100">*/}
        {!is_empty(home_page) &&
        home_page.contact.phones.map(item => (
          <a href={`tel:${item.phone}`} className="d-flex flex-row flex-nowrap">
            <i className="fa fa-phone pr-2"></i>
            <i className="fa fa-whatsapp pr-2"></i>
            {getFormattedPhone(item.phone)}
          </a>
        ))
        }
      </div>

      <div className="same-style d-block d-md-none w-100">
      {/*<div className="same-style d-none d-lg-block header-phone w-100">*/}
        {!is_empty(home_page) &&
        home_page.contact.phones.map(item => (
          <a href={`tel:${item.phone}`} className="d-flex flex-row flex-nowrap" style={{fontSize: 15}}>
            {getFormattedPhone(item.phone)}
          </a>
        ))
        }
      </div>


      {!is_empty(home_page) &&
      home_page.contact.socials.map(item => (
        <div className="same-style d-none d-lg-block">
          <a href={`${item.link}`}>{item.name === 'Facebook' &&
          <i className="fa fa-facebook-f ml-2"></i>}{item.name === 'Instagram' &&
          <i className="fa fa-instagram ml-2"></i>}</a>
        </div>
      ))
      }


      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag"/>
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none m-l-10">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag"/>
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-none d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu"/>
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
    home_page: state.homePageReducer.home_page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
