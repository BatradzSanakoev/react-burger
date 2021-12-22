import { combineReducers, Action, ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { orderReducer } from './order';
import { burgerIngredientReducer } from './burgerIngredient';
import { burgerConstructorReducer } from './burgerConstructor';
import { burgerIngredientsReducer } from './burgerIngredients';
import { userReducer } from './user';
import { types } from '@babel/core';
import { store } from '../store';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerIngredient: burgerIngredientReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, AnyAction>>;
export type AppDispatch = typeof store.dispatch;
