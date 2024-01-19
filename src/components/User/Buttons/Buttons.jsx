import React from 'react';
import { useDispatch } from "react-redux";
import { add_to_cart } from '../../../redux/actions';
import './Buttons.css';

const Buttons = ({ id, increment, decrement, counter, style, requestFavorite }) => {

    const dispatch = useDispatch();

    const pushToCart = (count, id) => dispatch(add_to_cart({ count, id }));

    return (
        <div className='box-buttons'>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${style} icon icon-tabler icon-tabler-heart-filled`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={requestFavorite}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" strokeWidth="0" fill="currentColor" />
            </svg>
            <div className='box-buttons-cart'>

                <div className='box-buttons-counter'>
                    <button className='button-counter' onClick={decrement}>-</button>
                    <span className='counter'>{counter}</span>
                    <button className='button-counter' onClick={increment}>+</button>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="33" height="33" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff9300" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => pushToCart(counter, id)}>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M12.5 17h-6.5v-14h-2" />
                    <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                </svg>

            </div>
        </div>
    );
};

export default Buttons;