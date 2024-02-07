import React from 'react';
import './OrderUser.css';
import { Link } from 'react-router-dom';
import { useGetDateOrder } from '../../../hooks/useGetDateOrder';

const OrderUser = ({ state, id, createdAt }) => {

    const date = useGetDateOrder(createdAt);

    const style = state == "Creado" ? "red" : "green";

    return (
        <article className='card-order'>
            <div className='box-first'>
                <p className='date'>{date}</p>
                <Link className='link-detail' to={`/Detalle-pedido/${id}`}>Detalle del pedido</Link>
            </div>
            <div className='box-id'>
                <p className='p'>ID de la orden:</p>
                <p className='p'>{id}</p>
            </div>
            <div className='box-state'>
                <p className='p'>Estado del pedido:</p>
                <p className={`p ${style}`}>{state}</p>
            </div>
        </article>
    );
};

export default OrderUser;