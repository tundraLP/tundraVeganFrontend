import React from 'react';
import { useDispatch } from 'react-redux';
import { clean_cart } from '../../../redux/actions';
import { useFindProductsCart } from '../../../hooks/useFindProductsCart';
import { ToastContainer } from 'react-toastify';
import CartListItem from '../CartListItem/CartListItem';
import './Cart.css';
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {

    const dispatch = useDispatch();

    const emptyCart = () => dispatch(clean_cart());

    const render = useFindProductsCart();

    const total = render.reduce((prev, prod) => prev + (prod.price * prod.count), 0);

    console.log(render)

    return (
        <section className='back-cart'>

            <h2>Tu carrito</h2>

            <CartListItem render={render} />

            <div className='box-cart'>
                <span className='span-total'>El total de la compra es ${total}</span>
                <button onClick={emptyCart}>Limpiar carrito</button>
            </div>
            <ToastContainer
                position='bottom-right'
                autoClose={4000}
                hideProgressBar={true}
                pauseOnHover={true}
                draggable={false}
                closeButton={false}
            />

        </section>
    );
};

export default Cart;