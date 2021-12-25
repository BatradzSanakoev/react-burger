import { GET_BURGER_INGREDIENTS_REQUEST, GET_BURGER_INGREDIENTS_SUCCESS, GET_BURGER_INGREDIENTS_FAILED } from '../types';
import { TBurgerIngredientType } from '../../utils/types';
import { TGetBurgerIngredientsActions } from '../actions/burgerIngredients';

type TInitialState = {
  ingredients: Array<TBurgerIngredientType> | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsLoaded: boolean;
};

const initialState: TInitialState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsLoaded: false
};

export const burgerIngredientsReducer = (state = initialState, action: TGetBurgerIngredientsActions): TInitialState => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsLoaded: true
      };
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      };
    }
    default: {
      return state;
    }
  }
};
