import uuid from "uuid/v4";
import {
  GET_PROMO_SUCCESS,
  GET_PROMO_FAIL,
} from "../actions/promoActions";

const initState = {
  promo: {}
};

const promoReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch(type) {
    case GET_PROMO_SUCCESS:
      return {
        ...state,
        promo: payload.promo
      }
    case GET_PROMO_FAIL:
      return {
        ...state,
        promo: {}
      }
    default:
      return state
  }
};

export default promoReducer;
