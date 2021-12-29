import { GET_ORDERS_ALL_REQUEST, GET_ORDERS_ALL_SUCCESS, GET_ORDERS_ALL_FAILED } from '../types';
import { AppThunk, AppDispatch } from '../reducers';
import { TOrder } from '../../utils/types';
import { MAIN_API } from '../../utils/constants';

type TGetOrdersActionRequest = { readonly type: typeof GET_ORDERS_ALL_REQUEST };
type TGetOrdersActionSuccess = {
  readonly type: typeof GET_ORDERS_ALL_SUCCESS;
  readonly payload: { total: number; totalToday: number; orders: Array<TOrder> };
};
type TGetOrdersActionFailed = { readonly type: typeof GET_ORDERS_ALL_FAILED };

export type TGetOrdersActions = TGetOrdersActionRequest | TGetOrdersActionSuccess | TGetOrdersActionFailed;

const getOrdersRequest = (): TGetOrdersActionRequest => {
  return { type: GET_ORDERS_ALL_REQUEST };
};

const getOrdersSuccess = (data: { total: number; totalToday: number; orders: Array<TOrder> }): TGetOrdersActionSuccess => {
  return { type: GET_ORDERS_ALL_SUCCESS, payload: data };
};

const getOrdersFailed = (): TGetOrdersActionFailed => {
  return { type: GET_ORDERS_ALL_FAILED };
};

export const GetOrdersAll: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getOrdersRequest());
  fetch(`${MAIN_API}/orders/all`)
    .then(res => {
      if (res.ok) return res.json();
      else return Promise.reject();
    })
    .then(res => dispatch(getOrdersSuccess({ total: res.total, totalToday: res.totalToday, orders: res.orders })))
    .catch(() => dispatch(getOrdersFailed()));
};
