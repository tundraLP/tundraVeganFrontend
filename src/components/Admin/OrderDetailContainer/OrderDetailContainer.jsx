import React from 'react';
import { useGetOrder } from '../../../hooks/useGetOrder';
import { useParams } from 'react-router-dom';
import OrderDetailAdmin from '../OrderDetailAdmin/OrderDetailAdmin';
import { useSelector } from 'react-redux';

const OrderDetailContainer = () => {

    const detail = useSelector((state) => state.detail);

    const { id } = useParams();

    useGetOrder(id);

    return (
        <section className='section-order-admin'>

            {detail && <OrderDetailAdmin {...detail} />}

        </section>
    );
};

export default OrderDetailContainer;