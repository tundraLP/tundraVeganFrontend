import { actions } from "./actions";

const user = {
    id: "111e1c03-9530-4b0e-80d4-7ac19ba13d99",
    image: "https://res.cloudinary.com/da6d9ru3s/image/upload/v1685498460/Avatar-Profile-Vector-PNG-Pic_aobyn6.png",
    type: "User",
    name: "blas",
    lastName: "casale",
    mail: "casale.blas@live.com",
    adress: "Camino arana",
    password: "Eminem97.",
    updatedAt: "2024-01-10T16:47:45.866Z",
    createdAt: "2024-01-10T16:47:45.866Z",
    deletedAt: null
}

const initialState = {
    user: user,
    cart: [],
    orders: [],
    favorites: [],
    products: [],
    types: [],
    clients: [],
    detail: null,
    error: null,
    booleanToasty: false
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

            if (findProduct == undefined) {
                return {
                    ...state,
                    cart: [...state.cart, newProduct],
                    booleanToasty: true
                };
            }
            else return state;

        case actions.DELETE_FROM_CART:
            const filteredCart = state.cart.filter((prod) => prod.id != action.payload);

            return {
                ...state,
                cart: filteredCart
            };

        case actions.UPDATE_QUANTITY:
            const { id, count } = action.payload;
            const prod = state.cart.find((prod) => prod.id === id);
            const index = state.cart.findIndex((prod) => prod.id === id);

            const newProd = {
                ...prod,
                count: count
            };

            state.cart[index] = newProd;

            return {
                ...state,
                cart: state.cart
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

        case actions.GET_TYPES:
            return {
                ...state,
                types: action.payload
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

        // action para cambiar el estado toasty y poder mostrar la alerta

        case actions.CHANGE_BOOLEAN_TOASTY:
            return {
                ...state,
                booleanToasty: action.payload
            };

        default:
            return state;
    };
};