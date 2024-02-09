import React from 'react';
import ItemOrder from '../../User/ItemOrder/ItemOrder';
import Modal from '../../General/Modal/Modal';
import { useState } from 'react';
import { useGetDateOrder } from '../../../hooks/useGetDateOrder';
import { uriBack } from '../../../utils/const';
import axios from 'axios';
import './OrderDetailAdmin.css';

const OrderDetailAdmin = ({ id, state, adress, products, total, date }) => {

    const dateToShow = useGetDateOrder(date);

    const style = state == 'Creado' ? 'red' : 'green';

    const input = { created: 'Creado', completed: 'Entregado' };

    const [stateToSend, setStateToSend] = useState(state);

    const [boolean, setBoolean] = useState(false);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.value == input.created) setStateToSend(e.target.value);
        if (e.target.value == input.completed) setStateToSend(e.target.value);
    };

    const handleClick = async () => {
        const info = { id, state: stateToSend };
        try {
            const response = await axios.put(`${uriBack}/order/modifyOrder`, info).then((res) => res.data);
            setMessage(response.message);
            setBoolean(!boolean);
        } catch (error) {
            setMessage(error.response.data);
            setBoolean(!boolean);
        };
    };

    const closeModal = () => setBoolean(!boolean);

    return (
        <article className='card-detail-order'>
            <div className='box-date-id'>

                <p className='p'>{dateToShow}</p>

                <div className='box-id-order'>
                    <p className='p'>ID de la orden:</p>
                    <p className='p-id-order'>{id}</p>
                </div>

            </div>

            <div className='box-products-order'>
                <span className='span-products'>Productos pedidos</span>
                <div className='box-products-order-list'>
                    {
                        products.map((prod) => <ItemOrder key={prod.id} {...prod} />)
                    }
                </div>
            </div>

            <div className='box-info-order admin-info-order'>
                <p className='p'>Dirección del envio: {adress}</p>
                <p className='p'>Total del pedido: <span className='price'>${total.slice(0, -3)}</span></p>
            </div>

            <div className='box-state-order'>
                <p className='p'>Estado del pedido: <span className={style}>{state}</span></p>
                <div className='box-select-order-state'>
                    <button onClick={handleClick} className='button-update-order'>Actualizar estado</button>

                    <label htmlFor="state" className='label-form'>Cambiar estado de la orden:</label>

                    <select name="state" id="state" className='select-item' onChange={handleChange}>
                        <option key={'Creado'} value={input.created}>Creado</option>
                        <option key={'Entregado'} value={input.completed}>Entregado</option>
                    </select>
                </div>
            </div>

            {boolean && <Modal closeModal={closeModal} message={message} />}
        </article>
    );
};

export default OrderDetailAdmin;