import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchFavorite } from '../../../hooks/useFetchFavorite';
import { useFetchOrder } from '../../../hooks/useFetchOrder';
import { useFetchProducts } from '../../../hooks/useFetchProducts';
import { useFetchAllOrders } from '../../../hooks/useFetchAllOrders';
import { useFetchAllUsers } from '../../../hooks/useFetchAllUsers';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = () => {

  const user = useSelector((state) => state.user);

  const products = useSelector((state) => state.products);

  user.type == "User" && useFetchFavorite(user.id);
  user.type == "User" && useFetchOrder(user.id);
  user && useFetchProducts();
  user.type == "Admin" && useFetchAllOrders();
  user.type = "Admin" && useFetchAllUsers();

  return (
    <div>
      <ItemList products={products} user={user} />
    </div>
  )
}

export default ItemListContainer