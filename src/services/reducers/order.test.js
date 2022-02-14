import { orderReducer } from './order';
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../types';

describe('order reducer', () => {
  it('order reducer initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      orderNumber: null,
      orderRequest: false,
      orderFailed: false
    });
  });

  it('GET_ORDER_REQUEST', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_REQUEST })).toEqual({
      orderNumber: null,
      orderRequest: true,
      orderFailed: false
    });
  });

  it('GET_ORDER_SUCCESS', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_SUCCESS, payload: 1000 })).toEqual({
      orderNumber: 1000,
      orderRequest: false,
      orderFailed: false
    });
  });

  it('GET_ORDER_FAILED', () => {
    expect(orderReducer(undefined, { type: GET_ORDER_FAILED })).toEqual({
      orderNumber: null,
      orderRequest: false,
      orderFailed: true
    });
  });

  it('CLEAR_ORDER', () => {
    expect(orderReducer(undefined, { type: CLEAR_ORDER })).toEqual({
      orderNumber: null,
      orderRequest: false,
      orderFailed: false
    });
  });
});
