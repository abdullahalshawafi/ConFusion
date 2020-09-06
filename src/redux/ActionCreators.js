import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    let newComment = {
        dishId,
        rating,
        author,
        comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        Credential: "same-origin"
    })
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
        .then(comment => dispatch(addComment(comment)))
        .catch(error => alert(`Sorry, an error occured.\nError:\n${error.message}`));
};

export const postFeedback = (feedback) => () => {
    let newFeedback = {
        firstname: feedback.firstname,
        lastname: feedback.lastname,
        telnum: feedback.telnum,
        email: feedback.email,
        agree: feedback.agree,
        contactType: feedback.contactType,
        message: feedback.message
    }

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        Credential: "same-origin"
    })
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
        .then(feedback => alert(JSON.stringify(feedback)))
        .catch(error => alert(`Sorry, an error occured.\nError:\n${error.message}`));
};

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

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + "leaders")
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
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMsg
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
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