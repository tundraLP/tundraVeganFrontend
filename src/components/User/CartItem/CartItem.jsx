import React from 'react';
import './CartItem.css';

const CartItem = ({ name, price, count, id, deleteItem }) => {

    return (
        <li className='card-cart'>
            <p>{name}</p>
            <p>Cantidad: {count}</p>
            <p>Precio por unidad: ${price}</p>
            <p>Total: ${price * count}</p>
            <button onClick={() => deleteItem(id)}>Borrar</button>
        </li>
    )
}

export default CartItem