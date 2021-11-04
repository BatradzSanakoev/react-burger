import { GET_ALL_INGREDIENTS_REQUEST, GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_FAILED } from "../types";
import { MAIN_API } from "../../utils/constants";

export const getAllIngredients = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_INGREDIENTS_REQUEST
        });
        fetch(`${MAIN_API}/ingredients`)
            .then(res => {
                if (res.ok) return res.json();
                else dispatch({ type: GET_ALL_INGREDIENTS_FAILED });
            })
            .then(res => dispatch({ type: GET_ALL_INGREDIENTS_SUCCESS, payload: res.data }))
            .catch(() => dispatch({ type: GET_ALL_INGREDIENTS_FAILED }));
    };
};