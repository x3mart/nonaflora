import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {connect} from "react-redux";
import {getDiscountPrice, promoPrice} from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  // cartItemStock,
  deleteAllFromCart
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {getFormattedPrice} from "../../helpers/phone";

const Cart = ({
                location,
                cartItems,
                currency,
                decreaseQuantity,
                addToCart,
                deleteFromCart,
                deleteAllFromCart,
                promo
              }) => {
  const [quantityCount] = useState(1);
  const {addToast} = useToasts();
  const {pathname} = location;
  let cartTotalPrice = 0;

  console.log(cartItems)

  return (
    <Fragment>
      <MetaTags>
        <title>Нонночка&Флорочка | Корзина</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Главная</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Корзина
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb/>
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Ваш товар:</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                        <tr>
                          <th>Изображение</th>
                          <th>Наименование</th>
                          <th>Цена</th>
                          <th>Кол-во</th>
                          <th>Стоимость</th>
                          <th>действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((cartItem, key) => {
                          const discountedPrice = promoPrice(
                            cartItem,
                            promo
                          );
                          const finalProductPrice = (
                            cartItem.price * currency.currencyRate
                          ).toFixed(0);
                          const finalDiscountedPrice = (
                            discountedPrice * currency.currencyRate
                          ).toFixed(0);

                          discountedPrice != null
                            ? (cartTotalPrice +=
                            finalDiscountedPrice * cartItem.quantity)
                            : (cartTotalPrice +=
                            finalProductPrice * cartItem.quantity);
                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                <img
                                  className="img-fluid"
                                  src={
                                    process.env.PUBLIC_URL +
                                    cartItem.image
                                  }
                                  alt=""
                                />
                              </td>

                              <td className="product-name">
                                {cartItem.title}
                                {cartItem.selectedProductColor &&
                                cartItem.selectedProductSize ? (
                                  <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                    <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>

                              <td className="product-price-cart">
                                {discountedPrice !== null ? (
                                  <Fragment>
                                      <span className="amount old">
                                        {
                                          getFormattedPrice(finalProductPrice)}
                                      </span>
                                    <span className="amount">
                                        {
                                          getFormattedPrice(finalDiscountedPrice)}
                                      </span>
                                  </Fragment>
                                ) : (
                                  <span className="amount">
                                      {
                                        getFormattedPrice(finalProductPrice)}
                                    </span>
                                )} р.
                              </td>

                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <button
                                    className="dec qtybutton"
                                    onClick={() =>
                                      decreaseQuantity(cartItem, addToast)
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    type="text"
                                    value={cartItem.quantity}
                                    readOnly
                                  />
                                  <button
                                    className="inc qtybutton"
                                    onClick={() =>
                                      addToCart(
                                        cartItem,
                                        addToast,
                                        quantityCount
                                      )
                                    }
                                    // disabled={
                                    //   cartItem !== undefined &&
                                    //   cartItem.quantity &&
                                    //   cartItem.quantity >=
                                    //     cartItemStock(
                                    //       cartItem,
                                    //       cartItem.selectedProductColor,
                                    //       cartItem.selectedProductSize
                                    //     )
                                    // }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                {discountedPrice !== null
                                  ?
                                  getFormattedPrice((
                                    finalDiscountedPrice * cartItem.quantity
                                  ).toFixed(0))
                                  :
                                  getFormattedPrice((
                                    finalProductPrice * cartItem.quantity
                                  ).toFixed(0))} р.
                              </td>

                              <td className="product-remove">
                                <button
                                  onClick={() =>
                                    deleteFromCart(cartItem, addToast)
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          Продолжить покупки
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Очистить корзину
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Общий итог
                        </h4>
                      </div>

                      <h4 className="grand-totall-title">
                        Сумма к оплате{" "}
                        <span>
                          {getFormattedPrice(cartTotalPrice.toFixed(0))} р.
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Оформить заказ
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Здесь ничего нет <br/>{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        На главную
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    promo: state.promoReducer.promo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
