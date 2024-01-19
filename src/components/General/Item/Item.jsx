import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Item.css';

const Item = ({ name, Type, price, image, id, user }) => {
  return (
    <NavLink to={user && user.type == "Admin" ? `/Detalle-admin/${id}` : `/Detalle/${id}`} className='link-item'>
      <div className='card'>
        <img src={image} alt={name} className='img' />
        <h4 className='title-card'>{name}</h4>
        <p className='p category'>Categoría: {Type.name}</p>
        <p className='p price'>Precio: ${price.slice(0, -3)}</p>
      </div>
    </NavLink >
  );
};

export default Item;