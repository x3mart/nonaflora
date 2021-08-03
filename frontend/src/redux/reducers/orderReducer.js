import uuid from "uuid/v4";
import {
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAIL,
  SEND_ORDER_STATUS_SUCCESS,
  SEND_ORDER_STATUS_FAIL,
  CLEAR_ORDER,
} from "../actions/orderActions";

const initState = {
  order: {}
};

const orderReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch(type) {
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        order: payload.order
      }
    case SEND_ORDER_FAIL:
      return {
        ...state,
        order: {}
      }
    case SEND_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        order: {}
      }
    case SEND_ORDER_STATUS_FAIL:
      return {
        ...state,
        order: {}
      }
    case CLEAR_ORDER:
      return {
        ...state,
        order: {}
      }
    default:
      return state
  }
};

export default orderReducer;
