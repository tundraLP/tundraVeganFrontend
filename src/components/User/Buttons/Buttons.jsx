import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from '../../../redux/actions';

const Buttons = ({ id, increment, decrement, counter }) => {

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const user = useSelector((state) => state.user);

    const pushToCart = (count, id) => {

        // const prod = {
        //     count: count,
        //     id: id
        // };

        dispatch(add_to_cart({ count, id }));

        const date = new Date();

        const day = date.getDate();

        const putInLS = {
            day: day,
            cart: cart,
            id: user.id
        };

        const stringify = JSON.stringify(putInLS);

        localStorage.setItem('cart', stringify);
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