import axios from 'axios';

export const actions = {
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
    GET_DETAIL: 'GET_DETAIL',
    CLEAN_DETAIL: 'CLEAN_DETAIL',
    GET_FAVORITES: 'GET_FAVORITES',
    CLEAN_FAVORITES: 'CLEAN_FAVORITES',
    GET_ORDERS: 'GET_ORDERS',
    CLEAN_ORDERS: 'CLEAN_ORDERS',
    ADD_TO_CART: 'ADD_TO_CART',
    CLEAN_CART: 'CLEAN_CART',

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

export const clean_detail = ()=>{
    return (dispatch) =>{
        return dispatch({
            type: actions.CLEAN_DETAIL,
            payload: null
        });
    }
}

export const get_detail = (detail)=>{
    return (dispatch) =>{
        return dispatch({
            type: actions.GET_DETAIL,
            payload: detail
        });
    }
}

export const get_orders = (orders)=>{
    return (dispatch) =>{
        return dispatch({
            type: actions.GET_ORDERS,
            payload: orders
        });
    }
}
export const clean_orders = ()=>{
    return (dispatch) =>{
        return dispatch({
            type: actions.GET_ORDERS,
            payload: []
        });
    }
}

export const get_favorites = (favorites)=>{
    return (dispatch)=>{
        return dispatch({
            type: actions.GET_FAVORITES,
            payload: favorites
        });
    }
}
export const clean_favorites = ()=>{
    return (dispatch)=>{
        return dispatch({
            type: actions.GET_FAVORITES,
            payload: []
        });
    }
}

export const add_to_cart = (cart)=>{
    return (dispatch)=>{
        return dispatch({
            type: actions.ADD_TO_CART,
            payload: cart
        });
    }
}

export const clean_cart = ()=>{
    return (dispatch) =>{
        return dispatch({
            type: actions.CLEAN_CART,
            payload: []
        });
    }
}