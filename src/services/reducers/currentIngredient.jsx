import { GET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT_INFO } from "../types";

const initialState = {
    item: null
};

export const currentIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_INGREDIENT: {
            return {
                ...state,
                item: action.payload
            };
        }
        case CLEAR_CURRENT_INGREDIENT_INFO: {
            return {
                ...state,
                item: null
            };
        }
        default: {
            return state;
        }
    }
};