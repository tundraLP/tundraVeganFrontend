

const initialState = {
    user: {},
    cart: {}
};


const rootReducer = (state = initialState, action)=>{
    switch (action.type){


        case SING_IN:
            return{
                ...state,
                user: action.payload
            };
            
        case SING_OUT:
            return{
                ...state,
                user: {}
            };

        default:    return state;

    }
}


module.exports = rootReducer;