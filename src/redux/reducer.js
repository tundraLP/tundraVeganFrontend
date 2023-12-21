import { actions } from "./actions";

const initialState = {
    user: null,
    cart: [],
    orders: [],
    favorites: [],
    detail: null,
    products: []
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
        
        case actions.GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case actions.CLEAN_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case actions.GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            };
        case actions.CLEAN_FAVORITES:
            return  {
                ...state,
                favorites: action.payload
            };
        case actions.GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case actions.CLEAN_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case actions.GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            };
        case actions.CLEAN_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            };
        case actions.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            };
        case actions.CLEAN_CART:
            return {
                ...state,
                cart: action.payload
            };
        default:
            return state;
    };
};