import React from 'react';
import ItemAdmin from '../../Admin/ItemAdmin/ItemAdmin';
import ItemUser from '../../User/ItemUser/ItemUser';

const ItemList = ({ products, user }) => {
  return (
    <div>
      {products.length && products?.map((prod) => {
        if (user.type == 'Admin') return <ItemAdmin key={prod.id} {...prod} />
        else return <ItemUser key={prod.id} {...prod} />
      })}
    </div>
  );
};

export default ItemList