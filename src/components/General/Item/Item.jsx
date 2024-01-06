import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ name, type, price, image, id, user }) => {
  return (
    <div className='card'>
      <h4>{name}</h4>
      <p className='p category'>Categoría: {type}</p>
      <p className='p price'>Precio: ${price}</p>
      <img src={image} alt={name} className='img' />
      <Link to={user && user.type == "Admin" ? `/Detalle-admin/${id}` : `/Detalle/${id}`} className='linkNav link-item'>Detalles</Link>
    </div>
  );
};

export default Item;