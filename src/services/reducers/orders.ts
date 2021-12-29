import { GET_ORDERS_ALL_REQUEST, GET_ORDERS_ALL_SUCCESS, GET_ORDERS_ALL_FAILED } from '../types';
import { TOrder } from '../../utils/types';
import { TGetOrdersActions } from '../actions/orders';

type TInitialState = {
  ordersAllRequest: boolean;
  ordersAllFailed: boolean;
  total: number;
  totalToday: number;
  orders: Array<TOrder>;
};

const initialState: TInitialState = {
  ordersAllRequest: false,
  ordersAllFailed: false,
  total: 0,
  totalToday: 0,
  orders: []
};

export const ordersReducer = (state = initialState, action: TGetOrdersActions): TInitialState => {
  switch (action.type) {
    case GET_ORDERS_ALL_REQUEST: {
      return {
        ...state,
        ordersAllRequest: true,
        ordersAllFailed: false
      };
    }
    case GET_ORDERS_ALL_SUCCESS: {
      return {
        ...state,
        ordersAllRequest: false,
        ordersAllFailed: false,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders
      };
    }
    case GET_ORDERS_ALL_FAILED: {
      return {
        ...state,
        ordersAllRequest: false,
        ordersAllFailed: true
      };
    }
    default: {
      return state;
    }
  }
};
