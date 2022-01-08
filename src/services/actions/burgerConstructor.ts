import { TBurgerIngredientType } from '../../utils/types';
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  INCREASE_CONSTRUCTOR_COUNT,
  DECREASE_CONSTRUCTOR_COUNT,
  ADD_CONSTRUCTOR_BUN,
  DELETE_CONSTRUCTOR_INGREDIENT,
  UPDATE_CONSTRUCTOR_INGREDIENTS
} from '../types';

type TAddConstructorIngredientAction = { readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT; readonly payload: TBurgerIngredientType };
type TDeleteConstructorIngredientAction = { readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT; readonly payload: string };
type TIncreaseConstructorCountAction = { readonly type: typeof INCREASE_CONSTRUCTOR_COUNT };
type TDecreaseConstructorCountAction = { readonly type: typeof DECREASE_CONSTRUCTOR_COUNT };
type TAddConstructorBunAction = { readonly type: typeof ADD_CONSTRUCTOR_BUN; readonly payload: TBurgerIngredientType };
type TUpdateConstructorIngredientsAction = {
  readonly type: typeof UPDATE_CONSTRUCTOR_INGREDIENTS;
  readonly payload: { dragIndex: number; hoverIndex: number };
};

export type TBurgerConstructorActions =
  | TAddConstructorIngredientAction
  | TDecreaseConstructorCountAction
  | TDeleteConstructorIngredientAction
  | TIncreaseConstructorCountAction
  | TAddConstructorBunAction
  | TUpdateConstructorIngredientsAction;

export const addConstructorIngredient = (item: TBurgerIngredientType): TAddConstructorIngredientAction => {
  const uniqueKey = Math.random();
  item.key = uniqueKey.toString();
  return { type: ADD_CONSTRUCTOR_INGREDIENT, payload: item };
};

export const deleteConstructorIngredient = (key: string): TDeleteConstructorIngredientAction => {
  return { type: DELETE_CONSTRUCTOR_INGREDIENT, payload: key };
};

export const increaseConstructorCount = (): TIncreaseConstructorCountAction => {
  return { type: INCREASE_CONSTRUCTOR_COUNT };
};

export const decreaseConstructorCount = (): TDecreaseConstructorCountAction => {
  return { type: DECREASE_CONSTRUCTOR_COUNT };
};

export const addConstructorBun = (item: TBurgerIngredientType): TAddConstructorBunAction => {
  const uniqueKey = Math.random();
  item.key = uniqueKey.toString();
  return { type: ADD_CONSTRUCTOR_BUN, payload: item };
};

export const updateConstructorIngredients = (dragIndex: number, hoverIndex: number): TUpdateConstructorIngredientsAction => {
  return {
    type: UPDATE_CONSTRUCTOR_INGREDIENTS,
    payload: { dragIndex, hoverIndex }
  };
};
