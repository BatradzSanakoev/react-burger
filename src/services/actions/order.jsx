import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../types';
import { MAIN_API } from '../../utils/constants';

export const getOrder = itemsId => {
  return dispatch => {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    fetch(`${MAIN_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ingredients: itemsId })
    })
      .then(res => {
        if (res.ok) return res.json();
        else dispatch({ type: GET_ORDER_FAILED });
      })
      .then(res => dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number }))
      .catch(() => dispatch({ type: GET_ORDER_FAILED }));
  };
};

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER
  };
};
