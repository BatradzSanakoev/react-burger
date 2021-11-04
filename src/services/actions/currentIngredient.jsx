import { GET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT_INFO } from "../types";

export const getCurrentIngredients = info => {
    return dispatch => {
        dispatch({
            type: GET_CURRENT_INGREDIENT,
            paylaod: info
        });
    };
};

export const clearCurrentIngredientInfo = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_CURRENT_INGREDIENT_INFO
        });
    };
};