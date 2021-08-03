import uuid from "uuid/v4";
import {
  GET_HOME_PAGE_SUCCESS,
  GET_HOME_PAGE_FAIL,
} from "../actions/homePageActions";

const initState = {
  home_page: {}
};

const homePageReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch(type) {
    case GET_HOME_PAGE_SUCCESS:
      return {
        ...state,
        home_page: payload.home_page
      }
    case GET_HOME_PAGE_FAIL:
      return {
        ...state,
        home_page: []
      }
    default:
      return state
  }
};

export default homePageReducer;
