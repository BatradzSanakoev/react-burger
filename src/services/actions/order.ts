import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../types';
import { MAIN_API, getCookie, retriableFetch } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TRes } from '../../utils/types';

type TGetOrderActionRequest = { readonly type: typeof GET_ORDER_REQUEST };
type TGetOrderActionSuccess = { readonly type: typeof GET_ORDER_SUCCESS; readonly payload: number };
type TGetOrderActionFailed = { readonly type: typeof GET_ORDER_FAILED };
type TClearOrderAction = { readonly type: typeof CLEAR_ORDER };

export type TOrderActions = TGetOrderActionRequest | TGetOrderActionSuccess | TGetOrderActionFailed | TClearOrderAction;

const getOrderRequest = (): TGetOrderActionRequest => {
  return { type: GET_ORDER_REQUEST };
};

const getOrderSuccess = (number: number): TGetOrderActionSuccess => {
  return { type: GET_ORDER_SUCCESS, payload: number };
};

const getOrderFailed = (): TGetOrderActionFailed => {
  return { type: GET_ORDER_FAILED };
};

export const getOrder: AppThunk = itemsId => (dispatch: AppDispatch) => {
  const accessToken = getCookie('accessToken');
  dispatch(getOrderRequest());
  retriableFetch<TRes>(`${MAIN_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ ingredients: itemsId })
  })
    .then(res => dispatch(getOrderSuccess(res.order.number)))
    .catch(() => dispatch(getOrderFailed()));
};

export const clearOrder = (): TClearOrderAction => {
  return { type: CLEAR_ORDER };
};
