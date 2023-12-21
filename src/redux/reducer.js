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

        // actions para los user
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

        // actions para los detail

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

        // actions para los favoritos

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

        // actions para las ordenes

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

        // actions para los favoritos

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

        // actions para el carrito

        case actions.ADD_TO_CART:
            const newProduct = action.payload;

            const findProduct = cart.find((prod) => prod.prod.id === newProduct.prod.id);

            // aca falta agregar una notificacion para que el usuario sepa que el producto ya fue pusheado al carrito antes
            if (findProduct == undefined) return state
            else {
                return {
                    ...state,
                    cart: [...state.cart, newProduct]
                };
            };

        case actions.DELETE_FROM_CART:
            const itemToDelete = action.payload;
            const filteredCart = cart.filter((prod) => prod.prod.id != itemToDelete.prod.id);

            return {
                ...state,
                cart: filteredCart
            };

        case actions.CLEAN_CART:
            return {
                ...state,
                cart: action.payload
            };

        // actions para los productos

        case actions.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        case actions.CLEAN_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        default:
            return state;
    };
};