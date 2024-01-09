import React, { useState } from 'react';
import Buttons from '../Buttons/Buttons';
import './DetailUser.css';

const DetailUser = ({ name, stock, price, type, description, image, id, style, requestFavorite }) => {

  const [counter, setCounter] = useState(1);

  const increment = () => counter < stock && setCounter(counter + 1);

  const decrement = () => counter > 1 && setCounter(counter - 1);

  return (
    <div className='card-detail'>

      <img src={image} alt={name} className='img-detail' />

      <div className='box-data'>
        <h4>{name}</h4>

        <p className='p category'>Categoría: {type}</p>

        <p className='p price'>Precio por unidad: ${price}</p>

        <p className='p price'>Precio total: ${price * counter}</p>

        <p className='p'>Quedan {stock} unidades en stock</p>

        <p className='p category'>{description}</p>
        
        <p>{id}</p>

        <Buttons requestFavorite={requestFavorite} counter={counter} increment={increment} decrement={decrement} id={id} style={style} />
      </div>

    </div>
  );
};

export default DetailUser