import { ADD_CONSTRUCTOR_INGREDIENT, INCREASE_CONSTRUCTOR_COUNT, DECREASE_CONSTRUCTOR_COUNT, ADD_CONSTRUCTOR_BUN, DELETE_CONSTRUCTOR_INGREDIENT, UPDATE_CONSTRUCTOR_INGREDIENTS } from "../types";

export const addConstructorIngredient = item => {
    const uniqueKey = Math.random();
    item.key = uniqueKey;
    return dispatch => {
        dispatch({
            type: ADD_CONSTRUCTOR_INGREDIENT,
            payload: item
        });
    };
};

export const deleteConstructorIngredient = key => {
    return dispatch => {
        dispatch({
            type: DELETE_CONSTRUCTOR_INGREDIENT,
            payload: key
        });
    };
};

export const increaseConstructorCount = () => {
    return dispatch => {
        dispatch({
            type: INCREASE_CONSTRUCTOR_COUNT
        });
    };
};

export const decreaseConstructorCount = () => {
    return dispatch => {
        dispatch({
            type: DECREASE_CONSTRUCTOR_COUNT
        });
    };
};

export const addConstructorBun = item => {
    const uniqueKey = Math.random();
    item.key = uniqueKey;
    return dispatch => {
        dispatch({
            type: ADD_CONSTRUCTOR_BUN,
            payload: item
        });
    };
};

export const updateConstructorIngredients = (dragIndex, hoverIndex) => {
    return dispatch => {
        dispatch({
            type: UPDATE_CONSTRUCTOR_INGREDIENTS,
            payload: { dragIndex, hoverIndex }
        });
    };
};