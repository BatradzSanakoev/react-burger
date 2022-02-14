import { GET_BURGER_INGREDIENTS_REQUEST, GET_BURGER_INGREDIENTS_SUCCESS, GET_BURGER_INGREDIENTS_FAILED } from '../types';
import { burgerIngredientsReducer } from './burgerIngredients';

describe('burgerIngredients reducer', () => {
  it('burgerIngredients reducer initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      ingredients: null,
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: false
    });
  });

  it('GET_BURGER_INGREDIENTS_REQUEST', () => {
    expect(burgerIngredientsReducer(undefined, { type: GET_BURGER_INGREDIENTS_REQUEST })).toEqual({
      ingredients: null,
      ingredientsRequest: true,
      ingredientsFailed: false,
      ingredientsLoaded: false
    });
  });

  it('GET_BURGER_INGREDIENTS_SUCCESS', () => {
    expect(
      burgerIngredientsReducer(undefined, {
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        payload: [
          {
            _id: '60d3b41abdacab0026a733c6',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255
          }
        ]
      })
    ).toEqual({
      ingredients: [
        {
          _id: '60d3b41abdacab0026a733c6',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255
        }
      ],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsLoaded: true
    });
  });

  it('GET_BURGER_INGREDIENTS_FAILED', () => {
    expect(burgerIngredientsReducer(undefined, { type: GET_BURGER_INGREDIENTS_FAILED })).toEqual({
      ingredients: null,
      ingredientsRequest: false,
      ingredientsFailed: true,
      ingredientsLoaded: false
    });
  });
});
