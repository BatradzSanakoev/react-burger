import { GET_ALL_INGREDIENTS_REQUEST, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED } from "../types";

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
};

export const allIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case GET_ALL_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                itemsRequest: false,
                itemsFailed: false
            };
        }
        case GET_ALL_INGREDIENTS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: true
            };
        }
        default: {
            return state;
        }
    }
};