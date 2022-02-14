import {
  ADD_CONSTRUCTOR_INGREDIENT,
  INCREASE_CONSTRUCTOR_COUNT,
  DECREASE_CONSTRUCTOR_COUNT,
  ADD_CONSTRUCTOR_BUN,
  DELETE_CONSTRUCTOR_INGREDIENT,
  UPDATE_CONSTRUCTOR_INGREDIENTS
} from '../types';
import { burgerConstructorReducer } from './burgerConstructor';

describe('burgerConstructor reducer', () => {
  it('burgerConstructor reducer initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      constructorBuns: null,
      constructorIngredients: [],
      constructorCount: 0
    });
  });

  it('ADD_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        payload: { id: '1', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000 }
      })
    ).toEqual({
      constructorBuns: null,
      constructorIngredients: [{ id: '1', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000 }],
      constructorCount: 0
    });
  });

  it('INCREASE_CONSTRUCTOR_COUNT', () => {
    expect(burgerConstructorReducer(undefined, { type: INCREASE_CONSTRUCTOR_COUNT })).toEqual({
      constructorBuns: null,
      constructorIngredients: [],
      constructorCount: 1
    });
  });

  it('DECREASE_CONSTRUCTOR_COUNT', () => {
    expect(burgerConstructorReducer(undefined, { type: DECREASE_CONSTRUCTOR_COUNT })).toEqual({
      constructorBuns: null,
      constructorIngredients: [],
      constructorCount: -1
    });
  });

  it('ADD_CONSTRUCTOR_BUN', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: ADD_CONSTRUCTOR_BUN,
        payload: { id: '3', name: 'Булка', type: 'bun', price: 1200 }
      })
    ).toEqual({
      constructorBuns: { id: '3', name: 'Булка', type: 'bun', price: 1200 },
      constructorIngredients: [],
      constructorCount: 0
    });
  });

  it('DELETE_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(
        {
          constructorBuns: null,
          constructorIngredients: [
            { id: '1', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000, key: '1' },
            { id: '2', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000, key: '2' }
          ],
          constructorCount: 0
        },
        { type: DELETE_CONSTRUCTOR_INGREDIENT, payload: '2' }
      )
    ).toEqual({
      constructorBuns: null,
      constructorIngredients: [{ id: '1', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000, key: '1' }],
      constructorCount: 0
    });
  });

  it('UPDATE_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      burgerConstructorReducer(
        {
          constructorBuns: null,
          constructorIngredients: [
            { id: '1', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000, key: '1' },
            { id: '2', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000, key: '2' }
          ],
          constructorCount: 0
        },
        { type: UPDATE_CONSTRUCTOR_INGREDIENTS, payload: { hoverIndex: 0, dragIndex: 1 } }
      )
    ).toEqual({
      constructorBuns: null,
      constructorIngredients: [
        { id: '2', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000, key: '2' },
        { id: '1', name: 'Соус фирменный Space Sauce', type: 'sauce', price: 1000, key: '1' }
      ],
      constructorCount: 0
    });
  });
});
