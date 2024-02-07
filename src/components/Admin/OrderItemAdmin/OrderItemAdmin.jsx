import React from 'react';
import { Link } from 'react-router-dom';
import './OrderItemAdmin.css';

const OrderItemAdmin = ({ id, state, UserId }) => {

    const style = state == 'Creado' ? 'red' : 'green';

    return (
        <article className='card-order'>
            <div className='box-first'>
                <p className='date'>10 de febrero</p>
                <Link className='link-detail' to={`/Detalle-pedido-admin/${id}`}>Detalle del pedido</Link>
            </div>
            <div className='box-id-order-admin'>
                <p className='p'>ID de la orden: {id}</p>
                <p className='p'>ID del usuario: {UserId}</p>
            </div>
            <div className='box-state'>
                <p className='p'>Estado del pedido:</p>
                <p className={`p ${style}`}>{state}</p>
            </div>
        </article>
    );
};

export default OrderItemAdmin;