import React from 'react';
import OrderListUser from '../../User/OrderListUser/OrderListUser';
import BtnHome from '../../General/BtnHome/BtnHome';
import './OrderListContainer.css';

const OrderListContainer = () => {

  return (
    <section className='back-order'>

      <BtnHome />

      <h2>Tus pedidos</h2>

      <OrderListUser />
      
    </section>
  );
};

export default OrderListContainer;