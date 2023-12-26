import React from 'react';
import { useDispatch } from "react-redux";
import { add_to_cart } from '../../../redux/actions';

const Buttons = ({ id, increment, decrement, counter }) => {

    const dispatch = useDispatch();

    const pushToCart = (count, id) => {

        dispatch(add_to_cart({ count, id }));
    };

    return (
        <div>
            <button onClick={() => decrement()}>-</button>
            <button onClick={() => pushToCart(counter, id)}>Carrito</button>
            <button onClick={() => increment()}>+</button>
        </div>
    )
}

export default Buttons