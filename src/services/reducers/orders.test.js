import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from '../types';
import { ordersReducer } from './orders';

describe('orders reducer', () => {
  it('orders reducer initial state', () => {
    expect(ordersReducer(undefined, {})).toEqual({
      ordersAllRequest: false,
      ordersAllFailed: false,
      total: 0,
      totalToday: 0,
      orders: [],
      wsConnected: false
    });
  });

  it('WS_CONNECTION_START', () => {
    expect(ordersReducer(undefined, { type: WS_CONNECTION_START })).toEqual({
      ordersAllRequest: false,
      ordersAllFailed: false,
      total: 0,
      totalToday: 0,
      orders: [],
      wsConnected: false
    });
  });

  it('WS_CONNECTION_CLOSED', () => {
    expect(ordersReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual({
      ordersAllRequest: false,
      ordersAllFailed: false,
      total: 0,
      totalToday: 0,
      orders: [],
      wsConnected: false,
      error: undefined
    });
  });

  it('WS_CONNECTION_ERROR', () => {
    expect(ordersReducer(undefined, { type: WS_CONNECTION_ERROR, payload: 'error' })).toEqual({
      ordersAllRequest: false,
      ordersAllFailed: false,
      total: 0,
      totalToday: 0,
      orders: [],
      wsConnected: false,
      error: 'error'
    });
  });

  it('WS_CONNECTION_SUCCESS', () => {
    expect(ordersReducer(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ordersAllRequest: false,
      ordersAllFailed: false,
      total: 0,
      totalToday: 0,
      orders: [],
      wsConnected: true,
      error: undefined
    });
  });

  it('WS_GET_MESSAGE', () => {
    expect(
      ordersReducer(undefined, {
        type: WS_GET_MESSAGE,
        payload: {
          total: 1000,
          totalToday: 2000,
          orders: [
            { id: 1, name: 'Burger' },
            { id: 2, name: 'Stellar' }
          ]
        }
      })
    ).toEqual({
      ordersAllRequest: false,
      ordersAllFailed: false,
      total: 1000,
      totalToday: 2000,
      orders: [
        { id: 1, name: 'Burger' },
        { id: 2, name: 'Stellar' }
      ],
      wsConnected: false,
      error: undefined
    });
  });
});
