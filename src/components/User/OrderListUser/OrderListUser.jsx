import React from 'react';
import { useFetchOrder } from '../../../hooks/useFetchOrder';
import { useSelector } from 'react-redux';
import OrderUser from '../OrderUser/OrderUser';

const OrderListUser = () => {

    const user = useSelector((state) => state.user);

    const orders = useSelector((state) => state.orders);

    useFetchOrder(user.id);

    return (
        <div>
            {
                orders.length > 0 ?
                    orders?.map((order) => <OrderUser key={order.id} {...order} />) :
                    <h3>Todavia no tenes ordenes</h3>
            }
        </div>
    );
};

export default OrderListUser;