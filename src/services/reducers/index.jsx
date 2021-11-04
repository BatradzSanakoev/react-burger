import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { currentIngredientReducer } from "./currentIngredient";
import { currentIngredientsReducer } from "./currentIngredients";
import { allIngredientsReducer } from "./allIngredients";

export const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    currentIngredients: currentIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer
});