import React from 'react';
import './Favorite.css';

const Favorite = ({ id, name, price, stock, Type, image, deleteFavorite }) => {
  return (
    <article className='card'>
      <h4>{name}</h4>
      <p className='p'>Categoría: {Type.name}</p>
      <p className='p price'>${price.slice(0, -3)}</p>
      <p className='p'>Quedan {stock} unidades en stock.</p>
      <img src={image} alt={name} className='img' />
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-minus" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => deleteFavorite(id)}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19.5 12.572l-2.494 2.47m-5.006 4.958l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        <path d="M16 19h6" />
      </svg>
    </article>
  );
};

export default Favorite;