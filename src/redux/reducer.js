import { actions } from "./actions";

const user = {
    id: "3900f3ff-85d5-4216-aed2-73d64e0a3542",
    image: "https://res.cloudinary.com/da6d9ru3s/image/upload/v1685498460/Avatar-Profile-Vector-PNG-Pic_aobyn6.png",
    type: "User",
    name: "blas",
    lastName: "casale",
    mail: "casale.blas@live.com",
    adress: "Camino la pindonga",
    password: "Eminem97.",
    updatedAt: "2024-01-09T13:57:16.292Z",
    createdAt: "2024-01-09T13:57:16.292Z",
    deletedAt: null
};


const initialState = {
    user: user,
    cart: [],
    orders: [],
    favorites: [],
    products: [],
    clients: [],
    detail: null,
    error: null
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

        // actions para los clients 

        case actions.GET_CLIENTS:
            return {
                ...state,
                clients: action.payload
            };

        case actions.CLEAN_CLIENTS:
            return {
                ...state,
                clients: action.payload
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

            const findProduct = state.cart.find((prod) => prod.id === newProduct.id);

            // aca falta agregar una notificacion para que el usuario sepa que el producto ya fue pusheado al carrito antes
            if (findProduct != undefined) return state
            else {
                return {
                    ...state,
                    cart: [...state.cart, newProduct]
                };
            };

        case actions.DELETE_FROM_CART:
            const filteredCart = state.cart.filter((prod) => prod.id != action.payload);

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

        // action para el error

        case actions.ERROR:
            return {
                ...state,
                error: action.payload
            };

        case actions.CLEAN_ERROR:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    };
};