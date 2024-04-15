import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProducts } from '../../../hooks/useFetchProducts';
import { useFetchTypes } from '../../../hooks/useFetchTypes';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';
import LoaderItems from '../LoaderItems/LoaderItems';
import {
  order_by_name,
  order_by_name_backwards,
  order_by_price,
  order_by_price_backwards,
  reset_products,
  filter_by_type
} from '../../../redux/actions';

const ItemListContainer = () => {

  const products = useSelector((state) => state.products);
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  // estados iniciales de los input
  const initialValue = { order: '', type: 'all' };
  const [input, setInput] = useState({ type: initialValue.type, order: initialValue.order });

  const productsToRender = useSelector((state) => state.productsToRender);

  // handler de los inputs
  const handleChangeFilter = (e) => {
    setInput({
      ...input,
      type: e.target.value
    });
  };

  const handleChangeOrder = (e) => {
    setInput({
      ...input,
      order: e.target.value
    });
  };

  // useEffect para controlar los inputs
  useEffect(() => {
    dispatch(filter_by_type([...productsToRender], input.type, [...products]));
  }, [input.type]);

  useEffect(() => {
    switch (input.order) {
      case 'abc': dispatch(order_by_name([...productsToRender]));
        break;
      case 'zyx': dispatch(order_by_name_backwards([...productsToRender]));
        break;
      case 'price-asc': dispatch(order_by_price([...productsToRender]));
        break;
      case 'price-des': dispatch(order_by_price_backwards([...productsToRender]));
        break;
      default: dispatch(reset_products([...products]));
        break;
    };
  }, [input.order]);

  const resetFilters = () => setInput(initialValue);

  useFetchProducts();
  useFetchTypes();

  return (
    <main className='main'>
      <h2>Nuestro catálogo</h2>

      <div className='selects'>

        <div className='box-selects'>
          <label className='label-selects'>Filtrar por: </label>
          <select onChange={handleChangeFilter} className='select-item' value={input.type}>
            <option key='all' value={initialValue.type}>*Todos los productos*</option>
            {types.map((type) => <option key={type.name} value={type.name} >{type.name}</option>)}
          </select>
        </div>

        <div className='box-selects'>
          <label className='label-selects' htmlFor='order'>Ordenar por: </label>
          <select onChange={handleChangeOrder} id='order' className='select-item' value={input.order}>
            <option selected disabled key='nothing' value={initialValue.order}>*Sin orden*</option>
            <option key='abc' value='abc' >Nombre ascendente</option>
            <option key='zyx' value='zyx' >Nombre descendente</option>
            <option key='price-asc' value='price-asc' >Mayor precio</option>
            <option key='price-des' value='price-des' >Menor precio</option>
          </select>
        </div>

        <button onClick={resetFilters} className='button-form'>Reiniciar filtros</button>

      </div>

      {
        productsToRender.length > 0 ?
          <ItemList products={productsToRender} />
          : <LoaderItems />
      }
    </main>
  )
}

export default ItemListContainer