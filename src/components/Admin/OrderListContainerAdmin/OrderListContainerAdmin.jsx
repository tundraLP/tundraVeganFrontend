import React from 'react';
import { useFetchAllOrdersAdmin } from '../../../hooks/useFetchAllOrdersAdmin'
import OrderListAdmin from '../OrderListAdmin/OrderListAdmin';
import BtnHome from '../../General/BtnHome/BtnHome';
import './OrderListContainerAdmin.css';

const OrderListContainerAdmin = () => {

    useFetchAllOrdersAdmin();

    return (
        <section className='section-order-admin'>

            <BtnHome />

            <h2>Lista de ordenes</h2>

            <OrderListAdmin />
        </section>
    );
};

export default OrderListContainerAdmin;