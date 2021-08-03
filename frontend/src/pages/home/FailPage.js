import React, {Fragment, useState, useEffect} from "react";
import {connect} from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import {send_order_status} from "../../redux/actions/orderActions"
import {useHistory} from "react-router-dom";

const FailPage = (props) => {

  const {send_order_status} = props

  let orderid = props.location.search ? props.location.search.split("&")[0].split('=')[1] : null

  let history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/checkout")
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if(orderid !== null) {
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
        <div className="fail-page">
          <i className="fa fa-times-circle"></i>
          <h2 className="text-center">
            Что-то пошло не так!
          </h2>
          <h4 className="text-center">Скоро вы будете перенаправлены на страницу оплаты. Попробуйте оплатить еще раз.</h4>
        </div>
      </LayoutOne>
    </Fragment>

  )
}

export default connect(null, {send_order_status})(FailPage)