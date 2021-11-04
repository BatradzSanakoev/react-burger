import { GET_CURRENT_INGREDIENTS } from "../types";

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
};

export const currentIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_INGREDIENTS: {
            return {
                ...state,
                items: [state.items, action.payload],
                itemsRequest: false,
                itemsFailed: false
            };
        }
        default: {
            return state;
        }
    }
};