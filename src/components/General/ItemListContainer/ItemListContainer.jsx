import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchProducts } from '../../../hooks/useFetchProducts';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = () => {

  const products = useSelector((state) => state.products);

  useFetchProducts();

  return (
    <main>
      <h2>Nuestro catálogo</h2>
      <ItemList products={products} />
    </main>
  )
}

export default ItemListContainer