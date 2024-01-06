import React from 'react';
import CartItem from '../CartItem/CartItem';
import './CartListItem.css';
import { useDispatch } from 'react-redux';
import { delete_from_cart } from '../../../redux/actions';

const CartListItem = ({ render }) => {

    const dispatch = useDispatch();

    const deleteItem = (id) => dispatch(delete_from_cart(id));

    return (
        <ul className='list-cart'>
            {
                render.length > 0 ?
                    render.map((prod) => <CartItem key={prod.id} {...prod} deleteItem={deleteItem} />)
                    : <h2>No hay plata</h2>
            }
        </ul>
    )
}

export default CartListItem