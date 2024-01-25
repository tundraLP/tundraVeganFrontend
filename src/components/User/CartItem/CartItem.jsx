import React from 'react';
import './CartItem.css';
import ButtonsCart from '../ButtonsCart/ButtonsCart';

const CartItem = ({ name, price, count, id, deleteItem, image, stock }) => {

    return (
        <li className='card-cart'>
            <div className='box-img-cart'>
                <img src={image} alt={name} className='img-cart' />
                <p className='p-cart'>{name}</p>
            </div>
            <div className='box-info-cart'>
                <div className='box-price-cart'>
                    <p className='p-cart'>Cantidad: {count}</p>
                    <p className='p-cart'>${price.slice(0, -3)}</p>
                </div>

                <ButtonsCart deleteItem={deleteItem} id={id} count={count} stock={stock} name={name}/>
            </div>
        </li>
    );
};

export default CartItem;