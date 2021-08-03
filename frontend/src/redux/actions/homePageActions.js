import axios from "axios";

export const GET_HOME_PAGE_SUCCESS = "GET_HOME_PAGE_SUCCESS";
export const GET_HOME_PAGE_FAIL = "GET_HOME_PAGE_FAIL";

export const load_home_page = () => async dispatch => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`https://nonaflora.ru/api/homepage/`, config);
      const data = {
        home_page: res.data,
      }
      dispatch({
        type: GET_HOME_PAGE_SUCCESS,
        payload: data
      })
    } catch (err) {
      dispatch({
        type: GET_HOME_PAGE_FAIL
      })
    }
}
