import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clean_cart } from '../../../redux/actions';
import CartListItem from '../CartListItem/CartListItem';

const Cart = () => {

    const dispatch = useDispatch();

    const emptyCart = () => dispatch(clean_cart());

    const cart = useSelector((state) => state.cart);

    const products = useSelector((state) => state.products);

    const [render, setRender] = useState([]);

    useEffect(() => {
        cart.map((prod) => {
            const found = products.find((prd) => prd.id === prod.id);
            found.count = prod.count;
            setRender(prev => [...prev, found]);
        });
    }, []);

    useEffect(() => {
        setRender([]);
        cart.map((prod) => {
            const found = products.find((prd) => prd.id === prod.id);
            found.count = prod.count;
            setRender(prev => [...prev, found]);
        });
    }, [cart])

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