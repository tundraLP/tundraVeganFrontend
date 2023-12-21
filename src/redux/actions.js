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
    GET_PRODUCTS: 'GET_PRODUCTS',
    CLEAN_PRODUCTS: 'CLEAN_PRODCUTS',
    DELETE_FROM_CART: 'DELETE_FROM_CART'
};

// actions para los user

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

// actions para los detail

export const clean_detail = () => {
    return (dispatch) => {
        return dispatch({
            type: actions.CLEAN_DETAIL,
            payload: null
        });
    };
};

export const get_detail = (detail) => {
    return (dispatch) => {
        return dispatch({
            type: actions.GET_DETAIL,
            payload: detail
        });
    };
};

// actions para las ordenes

export const get_orders = (orders) => {
    return (dispatch) => {
        return dispatch({
            type: actions.GET_ORDERS,
            payload: orders
        });
    };
};

export const clean_orders = () => {
    return (dispatch) => {
        return dispatch({
            type: actions.GET_ORDERS,
            payload: []
        });
    };
};

// actions para los favoritos

export const get_favorites = (favorites) => {
    return (dispatch) => {
        return dispatch({
            type: actions.GET_FAVORITES,
            payload: favorites
        });
    };
};

export const clean_favorites = () => {
    return (dispatch) => {
        return dispatch({
            type: actions.GET_FAVORITES,
            payload: []
        });
    };
};

// actions para el carrito

export const add_to_cart = (item) => {
    return (dispatch) => {
        return dispatch({
            type: actions.ADD_TO_CART,
            payload: item
        });
    };
};

export const delete_from_cart = (itemId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_FROM_CART',
            payload: itemId
        });
    };
};

export const clean_cart = () => {
    return (dispatch) => {
        return dispatch({
            type: actions.CLEAN_CART,
            payload: []
        });
    };
};

// actions para los productos

export const get_products = (products) => {
    return (dispatch) => {
        return dispatch({
            type: actions.GET_PRODUCTS,
            payload: products
        });
    };
};

export const clean_products = () => {
    return (dispatch) => {
        return dispatch({
            type: actions.CLEAN_PRODUCTS,
            payload: []
        });
    };
};