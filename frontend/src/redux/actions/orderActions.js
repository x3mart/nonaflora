import axios from "axios";

export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAIL = "SEND_ORDER_FAIL";
export const SEND_ORDER_STATUS_SUCCESS = "SEND_ORDER_STATUS_SUCCESS";
export const SEND_ORDER_STATUS_FAIL = "SEND_ORDER_STATUS_FAIL";
export const CLEAR_ORDER = "CLEAR_ORDER";

export const send_order = (goods, delivery_day, delivery_time, amount, name, email, phone, otherName, otherPhone, address, comment, promo) => async dispatch => {

  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  const body = JSON.stringify({
    goods: goods,
    sber: {},
    delivery_day: delivery_day,
    delivery_time: delivery_time,
    amount: amount,
    name: name,
    email: email,
    phone: phone,
    name2: otherName,
    phone2: otherPhone,
    adress: address,
    comment: comment,
    promo: promo
  });

  console.log(2)

  try {
    const res = await axios.post(`https://nonaflora.ru/api/orders/`, body, config);
    const data = {
      order: res.data,
    }
    dispatch({
      type: SEND_ORDER_SUCCESS,
      payload: data
    })
  } catch (err) {
    const data = {
      order: err.response
    }
    dispatch({
      type: SEND_ORDER_FAIL,
      payload: data
    })
  }
}

export const send_order_status = (orderid) => async dispatch => {

  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  try {
    const res = await axios.patch(`https://nonaflora.ru/api/orders/${orderid}/`, config);

    dispatch({
      type: SEND_ORDER_STATUS_SUCCESS
    })
  } catch (err) {

    dispatch({
      type: SEND_ORDER_STATUS_FAIL
    })
  }
}

export const clear_order = () => {

  return dispatch => dispatch({
    type: CLEAR_ORDER
  })
}
