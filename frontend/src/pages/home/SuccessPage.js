import React, {Fragment, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import {send_order_status, clear_order} from "../../redux/actions/orderActions"
import {deleteAllFromCart} from "../../redux/actions/cartActions";

const SuccessPage = (props) => {

  const {send_order_status, clear_order, deleteAllFromCart} = props

  let history = useHistory();

  let orderid = props.location.search ? props.location.search.split("&")[0].split('=')[1] : null

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/")
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    deleteAllFromCart()
    clear_order()
    if (orderid !== null) {
      send_order_status(orderid)
    }
  }, [])


  return (
    <Fragment>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <div className="success-page">
          <i className="fa fa-check-circle"></i>
          <h2 className="text-center">
            Поздравляем с успешной оплатой заказа!
          </h2>
          <h4 className="text-center">Скоро вы будете перенаправлены на главную страницу.</h4>
        </div>
      </LayoutOne>
    </Fragment>

  )
}

export default connect(null, {send_order_status, clear_order, deleteAllFromCart})(SuccessPage)