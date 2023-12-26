import React from 'react';
import { useDispatch } from "react-redux";
import { add_to_cart } from '../../../redux/actions';
import './Buttons.css';

const Buttons = ({ id, increment, decrement, counter }) => {

    const dispatch = useDispatch();

    const pushToCart = (count, id) => dispatch(add_to_cart({ count, id }));
    
    return (
        <div className='box-buttons-cart'>
            <div className='box-buttons-counter'>
                <button onClick={() => decrement()}>-</button>
                <span>{counter}</span>
                <button onClick={() => increment()}>+</button>
            </div>
            <button onClick={() => pushToCart(counter, id)}>Carrito</button>
        </div>
    )
}

export default Buttons