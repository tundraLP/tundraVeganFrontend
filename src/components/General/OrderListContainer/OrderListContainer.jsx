import React from 'react';
import { useSelector } from 'react-redux';
import OrderListUser from '../../User/OrderListUser/OrderListUser';
import OrderListAdmin from '../../Admin/OrderListAdmin/OrderListAdmin';
import './OrderListContainer.css';

const OrderListContainer = () => {

  const user = useSelector((state) => state.user);

  return (
    <section className='back-order'>
      <h2>Tus pedidos</h2>
      {
        user.type == 'Admin' ?
          <OrderListAdmin /> :
          <OrderListUser />
      }
    </section>
  );
};

export default OrderListContainer;