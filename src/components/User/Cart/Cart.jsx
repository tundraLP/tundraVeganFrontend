import React from 'react';
import { useDispatch } from 'react-redux';
import { clean_cart } from '../../../redux/actions';
import { useFindProductsCart } from '../../../hooks/useFindProductsCart';
import CartListItem from '../CartListItem/CartListItem';

const Cart = () => {

    const dispatch = useDispatch();

    const emptyCart = () => dispatch(clean_cart());

    const render = useFindProductsCart();

    const total = render.reduce((prev, prod) => prev + (prod.price * prod.count), 0);

    return (
        <section>
            <CartListItem render={render} />

            <div>
                <span>El total de la compra es ${total}</span>
                <button onClick={emptyCart}>Limpiar carrito</button>
            </div>

        </section>
    );
};

export default Cart;