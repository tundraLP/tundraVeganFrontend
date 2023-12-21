import axios from 'axios';

export const actions = {
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
};

export const sign_in = (user) => {
    return (dispatch) => {
        return dispatch({
            type: actions.SIGN_IN,
            payload: user
        });
    };
};

export const sign_out = () => {
    return (dispatch) => {
        return dispatch({
            type: actions.SIGN_OUT,
            payload: null
        });
    };
};