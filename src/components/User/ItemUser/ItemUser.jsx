import React from 'react';
import { useState } from 'react'
import Buttons from '../Buttons/Buttons';
import './ItemUser.css';

const ItemUser = ({ name, type, description, price, image, id, stock }) => {

    const [counter, useCounter] = useState(1);

    const increment = () => useCounter(counter + 1);

    const decrement = () => counter > 1 && useCounter(counter - 1);

    return (
        <div>
            <p>{name}</p>
            <p>{type}</p>
            <p>{description}</p>
            <p>{price}</p>
            <img src={image} alt="Foto alternativa" className='img' />
            <p>Cantidad a comprar: {counter}</p>
            {
                stock > 1 &&
                < Buttons counter={counter} id={id} increment={increment} decrement={decrement} />
            }
        </div>
    );
};

export default ItemUser;