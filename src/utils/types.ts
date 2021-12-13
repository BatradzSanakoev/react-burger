import React, { ChangeEvent } from 'react';

export type TAuthType = {
  registerRequest: boolean;
  registerError: boolean;
  authRequest: boolean;
  authError: boolean;
  logoutRequest: boolean;
  logoutError: boolean;
  errorText: string | null;
  getUserRequest: boolean;
  getUserError: boolean;
  getUserLoaded: boolean;
  userUpdateRequest: boolean;
  userUpdateError: boolean;
  isAuth: boolean;
  user: any;
};

export type TBurgerIngredientType = {
  _id: string;
  name: string;
  type: string;
  image?: string;
  image_large?: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  key?: string;
};

export type TBurgerConstructorType = {
  constructorBuns: TBurgerIngredientType | null;
  constructorIngredients: Array<TBurgerIngredientType> | [];
  constructorCount: number;
};

export type TBurgerIngredientsType = {
  ingredients: Array<TBurgerIngredientType> | [];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsLoaded: boolean;
};

export type TCustomInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  size?: 'small' | 'default' | undefined;
};
