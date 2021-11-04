import { GET_CURRENT_INGREDIENTS } from "../types";

export const getCurrentIngredients = item => {
    return dispatch => {
        dispatch({
            type: GET_CURRENT_INGREDIENTS,
            paylaod: item
        });
    };
};