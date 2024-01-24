import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { update_quantity } from '../../../redux/actions';
import './ButtonsCart.css';

const ButtonsCart = ({ deleteItem, id, count, stock }) => {

    const dispatch = useDispatch();

    const [counter, setCounter] = useState(count);

    const increment = () => counter < stock && setCounter(counter + 1);

    const decrement = () => counter > 1 && setCounter(counter - 1);

    const notification = () => {
        toast.info('Se actualizo la cantidad.', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: false,
            className: 'toasty',
            bodyClassName: 'toasty-body',
            icon: false
        });
    };
    
    const updateCart = () => {
        if (counter != count) {
            dispatch(update_quantity({ id: id, count: counter }));
            notification();
        };
    };

    return (
        <div className='box-buttons-cart-buy'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fafafa" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => deleteItem(id)}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>

            <div className='box-update-cart'>
                <button className='button-counter' onClick={decrement}>-</button>
                <span>{counter}</span>
                <button className='button-counter' onClick={increment}>+</button>
            </div>

            <button onClick={updateCart}>Actualizar carrito</button>

        </div>
    );
};

export default ButtonsCart;