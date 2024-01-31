import React from 'react';
import { useState } from 'react';
import Buttons from '../Buttons/Buttons';
import './DetailUser.css';

const DetailUser = ({ name, stock, price, Type, description, image, id, style, requestFavorite }) => {

  const [counter, setCounter] = useState(1);

  const increment = () => counter < stock && setCounter(counter + 1);

  const decrement = () => counter > 1 && setCounter(counter - 1);

  return (
    <div className='card-detail'>

      <img src={image} alt={name} className='img-detail' />

      <div className='box-data'>
        <h4>{name}</h4>

        <p className='p category'>Categoría: {Type.name}</p>

        <p className='p price'>Precio por unidad: ${price.slice(0, -3)}</p>

        <p className='p price'>Precio total: ${price * counter}</p>

        <p className='p'>Quedan {stock} unidades en stock</p>

        <p className='p category'>{description}</p>

        <Buttons
          requestFavorite={requestFavorite}
          counter={counter}
          increment={increment}
          decrement={decrement}
          id={id}
          style={style}
          name={name}
        />
      </div>

    </div>
  );
};

export default DetailUser