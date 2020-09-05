import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + "dishes")
        .then(response => {
            if (response.ok)
                return response;
            else {
                let err = new Error(`Error ${response.status}: ${response.statusText}`);
                err.response = response;
                throw err;
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + "promotions")
        .then(response => {
            if (response.ok)
                return response;
            else {
                let err = new Error(`Error ${response.status}: ${response.statusText}`);
                err.response = response;
                throw err;
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMsg
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + "comments")
        .then(response => {
            if (response.ok)
                return response;
            else {
                let err = new Error(`Error ${response.status}: ${response.statusText}`);
                err.response = response;
                throw err;
            }
        },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});