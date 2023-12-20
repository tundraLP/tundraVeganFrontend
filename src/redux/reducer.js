import { actions } from "./actions";

const initialState = {
    user: {},
    cart: [],
    order: [],
    favorite: []
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.SIGN_IN:
            return {
                ...state,
                user: action.payload
            };

        case actions.SIGN_OUT:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    };
};