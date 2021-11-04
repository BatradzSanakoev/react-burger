import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../types";
import { MAIN_API } from "../../utils/constants";

export const getOrder = itemsId => {
    return dispatch => {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        fetch(`${MAIN_API}/order`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ ingredients: itemsId })
        })
            .then(res => {
                if (res.ok) return res.json();
                else dispatch({ type: GET_ORDER_FAILED });
            })
            .then(res => dispatch({ type: GET_ORDER_SUCCESS, payload: res.data }))
            .catch(() => dispatch({ type: GET_ORDER_FAILED }));
    };
};