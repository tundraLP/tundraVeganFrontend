import React from 'react';
import { useFetchAllOrdersAdmin } from '../../../hooks/useFetchAllOrdersAdmin'
import OrderListAdmin from '../OrderListAdmin/OrderListAdmin';
import './OrderListContainerAdmin.css';

const OrderListContainerAdmin = () => {

    useFetchAllOrdersAdmin();

    return (
        <section className='section-order-admin'>

            <h2>Lista de ordenes</h2>

            <OrderListAdmin />
        </section>
    );
};

export default OrderListContainerAdmin;