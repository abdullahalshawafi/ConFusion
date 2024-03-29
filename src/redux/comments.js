import * as ActionTypes from "./ActionTypes";

export const Comments = (state = {
    errMsg: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            return state.comments.concat(action.payload);
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMsg: null, comments: action.payload };
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMsg: action.payload };
        default:
            return state;
    }
}