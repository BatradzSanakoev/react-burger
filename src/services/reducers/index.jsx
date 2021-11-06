import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { burgerIngredientReducer } from "./burgerIngredient";
import { burgerConstructorReducer } from "./burgerConstructor";
import { burgerIngredientsReducer } from "./burgerIngredients";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerIngredient: burgerIngredientReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer
});