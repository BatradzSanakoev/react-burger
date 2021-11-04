import { GET_CURRENT_INGREDIENTS } from "../types";

const initialState = {
    items: []
};

export const currentIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_INGREDIENTS: {
            return {
                ...state,
                items: [state.items, action.payload]
            };
        }
        default: {
            return state;
        }
    }
};