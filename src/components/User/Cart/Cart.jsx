import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clean_cart, clean_error, put_error } from '../../../redux/actions';
import { useFindProductsCart } from '../../../hooks/useFindProductsCart';
import { ToastContainer } from 'react-toastify';
import { usePreparePayment } from '../../../hooks/usePreparePayment';
import CartListItem from '../CartListItem/CartListItem';
import Modal from '../../General/Modal/Modal';
import ModalAdress from '../ModalAdress/ModalAdress';
import { Order } from '../../../utils/classOrder';
import { uriBack } from '../../../utils/const'
import axios from 'axios';
import './Cart.css';
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {

    const [booleanModal, setBooleanModal] = useState(false);

    const [message, setMessage] = useState("");

    const [booleanModalAdress, setBooleanModalAdress] = useState(false);

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const user = useSelector((state) => state.user);

    const emptyCart = () => dispatch(clean_cart());

    const render = useFindProductsCart();

    const total = render.reduce((prev, prod) => prev + (prod.price * prod.count), 0);

    const createOrder = async (adress) => {
        const info = new Order(user.id, cart, adress, total);
        try {
            const response = await axios.post(`${uriBack}/order/createOrder`, info).then((res) => res.data);
            setMessage(response.message);
            setBooleanModal(!booleanModal);
        } catch (error) {
            dispatch(put_error(error.response.data));
        }
    }

    const closeModal = () => setBooleanModal(!booleanModal)

    const closeModalAdress = () => setBooleanModalAdress(!booleanModalAdress)

    useEffect(() => {
        return () => dispatch(clean_error())
    });

    return (
        <section className='back-cart'>

            <h2>Tu carrito</h2>

            <CartListItem render={render} />

            <div className='box-cart'>
                <span className='span-total'>El total de la compra es ${total}</span>
                <button onClick={emptyCart} className='button-empty-cart'>Limpiar carrito</button>
            </div>

            <button className='button-complete-buy' onClick={closeModalAdress}>Completar pedido</button>

            {booleanModal && <Modal closeModal={closeModal} message={message} key={'message'} />}

            {
                booleanModalAdress &&
                <ModalAdress
                    adressUser={user.adress}
                    closeModal={closeModalAdress}
                    createOrder={createOrder}
                    key={'adress'} />
            }

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