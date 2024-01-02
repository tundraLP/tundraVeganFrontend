import React from 'react';
import Item from '../Item/Item';
import { useSelector } from 'react-redux';
import './ItemList.css'

const ItemList = ({ products }) => {

  const user = useSelector((state) => state.user);

  return (
    <section className='layout'>
      {products.length > 0 && products?.map((prod) => <Item key={prod.id} {...prod} user={user} />)}
    </section>
  );
};

export default ItemList