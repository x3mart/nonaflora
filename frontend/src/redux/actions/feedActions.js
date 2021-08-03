import axios from "axios";

export const GET_FEED_SUCCESS = "GET_FEED_SUCCESS";
export const GET_FEED_FAIL = "GET_FEED_FAIL";

export const get_feed = (code) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  try {
    const res = await axios.get(`https://graph.instagram.com/me/media?access_token=IGQVJWaGRmbURVRFY1djVYRnY5ekx4OHYybm9zaVgteU1VU19paUJPSWdJY2FfVThXYmZATQVcwZAE9Gal8wSk41LUd3RmRndmVMNGllbDJHZATU3TFZAjdC10cDNnUkYyN1F2TmlCZAHdwWHcwSzJDREhBeAZDZD&fields=media_url,media_type,caption,permalink`, config);
    const data = {
      feed: res.data.data,
    }
    dispatch({
      type: GET_FEED_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({
      type: GET_FEED_FAIL
    })
  }
}
