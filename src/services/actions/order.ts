import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../types';
import { MAIN_API, getCookie, setCookies, retriableFetch } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TRes } from '../../utils/types';

export const getOrder: AppThunk = itemsId => (dispatch: AppDispatch) => {
  const accessToken = getCookie('accessToken');
  dispatch({
    type: GET_ORDER_REQUEST
  });
  retriableFetch<TRes>(`${MAIN_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ ingredients: itemsId })
  })
    .then(res => dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number }))
    .catch(() => dispatch({ type: GET_ORDER_FAILED }));
};

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER
  };
};
