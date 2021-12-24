import { GET_BURGER_INGREDIENTS_REQUEST, GET_BURGER_INGREDIENTS_SUCCESS, GET_BURGER_INGREDIENTS_FAILED } from '../types';
import { MAIN_API } from '../../utils/constants';
import { AppThunk, AppDispatch } from '../reducers';
import { TBurgerIngredientType } from '../../utils/types';

type TGetBurgerIngredientsActionRequest = { readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST };
type TGetBurgerIngredientsActionSuccess = { readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS; readonly payload: Array<TBurgerIngredientType> };
type TGetBurgerIngredientsActionFailed = { readonly type: typeof GET_BURGER_INGREDIENTS_FAILED };

export type TGetBurgerIngredientsActions =
  | TGetBurgerIngredientsActionRequest
  | TGetBurgerIngredientsActionSuccess
  | TGetBurgerIngredientsActionFailed;

const getBurgerIngredientsRequest = (): TGetBurgerIngredientsActionRequest => {
  return {
    type: GET_BURGER_INGREDIENTS_REQUEST
  };
};

const getBurgerIngredientsSuccess = (data: Array<TBurgerIngredientType>): TGetBurgerIngredientsActionSuccess => {
  return {
    type: GET_BURGER_INGREDIENTS_SUCCESS,
    payload: data
  };
};

const getBurgerIngredientsFailed = (): TGetBurgerIngredientsActionFailed => {
  return {
    type: GET_BURGER_INGREDIENTS_FAILED
  };
};

export const getBurgerIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getBurgerIngredientsRequest());
  fetch(`${MAIN_API}/ingredients`)
    .then(res => {
      if (res.ok) return res.json();
      else return Promise.reject();
    })
    .then(res => dispatch(getBurgerIngredientsSuccess(res.data)))
    .catch(() => dispatch(getBurgerIngredientsFailed()));
};
