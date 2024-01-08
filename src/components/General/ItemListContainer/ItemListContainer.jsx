import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchProducts } from '../../../hooks/useFetchProducts';
import { useFetchTypes } from '../../../hooks/useFetchTypes';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';
import LoaderItems from '../LoaderItems/LoaderItems';

const ItemListContainer = () => {

  const products = useSelector((state) => state.products);
  const types = useSelector((state)=> state.types);

  useFetchProducts();
  useFetchTypes();

  return (
    <main className='main'>
      <h2>Nuestro catálogo</h2>
      {products.length > 0 ?
        <ItemList products={products} />
        : <LoaderItems />
      }
    </main>
  )
}

export default ItemListContainer