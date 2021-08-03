import uuid from "uuid/v4";
import {
  GET_FEED_SUCCESS,
  GET_FEED_FAIL,
} from "../actions/feedActions";

const initState = {
  feed: []
};

const feedReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch(type) {
    case GET_FEED_SUCCESS:
      return {
        ...state,
        feed: payload.feed
      }
    case GET_FEED_FAIL:
      return {
        ...state,
        feed: []
      }
    default:
      return state
  }
};

export default feedReducer;
