import { TOrderActions } from '../actions/order';
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../types';

type TInitialState = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action: TOrderActions): TInitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false,
        orderFailed: false
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      };
    }
    case CLEAR_ORDER: {
      return {
        ...state,
        orderNumber: null,
        orderRequest: false,
        orderFailed: false
      };
    }
    default: {
      return state;
    }
  }
};
