import { ADD_BURGER_INGREDIENT_INFO, CLEAR_BURGER_INGREDIENT_INFO } from "../types";

export const addBurgerIngredientInfo = info => {
    return dispatch => {
        dispatch({
            type: ADD_BURGER_INGREDIENT_INFO,
            payload: info
        });
    };
};

export const clearBurgerIngredientInfo = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_BURGER_INGREDIENT_INFO
        });
    };
};