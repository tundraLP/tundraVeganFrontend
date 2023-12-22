import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchFavorite } from '../../../hooks/useFetchFavorite';
import { useFetchOrder } from '../../../hooks/useFetchOrder';
import { useFetchProducts } from '../../../hooks/useFetchProducts';
import ItemList from '../ItemList/ItemList';


const ItemListContainer = () => {

  const user = useSelector((state) => state.user);

  const products = useSelector((state) => state.products);

  useFetchFavorite(user.id);
  useFetchOrder(user.id);
  useFetchProducts();

  return (
    <div>
      <ItemList products={products} user={user} />
    </div>
  )
}

export default ItemListContainer