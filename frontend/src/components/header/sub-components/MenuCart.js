import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {promoPrice} from "../../../helpers/product";
import {getFormattedPrice} from "../../../helpers/phone";
import {connect} from "react-redux"

const MenuCart = ({cartData, currency, deleteFromCart, promo}) => {
  let cartTotalPrice = 0;
  const {addToast} = useToasts();
  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              // const discountedPrice = null;
              const discountedPrice = promoPrice(
                single,
                promo
              );

              const finalProductPrice = (
                single.price * currency.currencyRate
              ).toFixed(0);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(0);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <img
                      alt=""
                      src={process.env.PUBLIC_URL + single.image}
                      className="img-fluid"
                    />
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      {" "}
                      {single.title}{" "}
                    </h4>
                    <h6>Кол-во: {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? getFormattedPrice(finalDiscountedPrice)
                        : getFormattedPrice(finalProductPrice)} р.
                    </span>
                    {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single.selectedProductColor}</span>
                        <span>Size: {single.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single, addToast)}>
                      <i className="fa fa-times-circle"/>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Итого :{" "}
              <span className="shop-total">
                {getFormattedPrice(cartTotalPrice.toFixed(0))} р.
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              Посмотреть корзину
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              Оформить заказ
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Корзина пуста</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => ({
  promo: state.promoReducer.promo
})

export default connect(mapStateToProps)(MenuCart);
