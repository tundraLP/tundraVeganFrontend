import React from 'react';
import { useFindProductsOrder } from '../../../hooks/useFindProductsOrder';
import ItemOrder from '../ItemOrder/ItemOrder';
import './OrderUser.css';

const OrderUser = ({ state, adress, total, id, createdAt }) => {

    const products = useFindProductsOrder(id);

    const style = state == "Creado" ? "red" : "green"

    return (
        <article className='card-order'>
            <div className='box-id'>
                <p className='p'>ID de la orden:</p>
                <p className='p id'>{id}</p>
            </div>
            <div className='box-state'>
                <p className='p'>Estado del pedido:</p>
                <p className={`p ${style}`}>{state}</p>
            </div>
            {/* <p className={`p ${style}`}>{state}</p> */}
            <p className='p'>Dirección de envio: {adress}</p>
            <div className='box-order'>
                {
                    products.map((prod) => <ItemOrder key={prod.id} {...prod} />)
                }
            </div>
            <div className='box-price'>
                <p className='p'>Total de la orden: </p>
                <p className='p price id'>${total.slice(0, -3)}</p>
            </div>
        </article>
    );
};

export default OrderUser;