import React from 'react';

const Favorite = ({ id, name, price, stock, description, type, image, deleteFavorite }) => {
  return (
    <article>
      <h4>{name}</h4>
      <p>{type}</p>
      <p>${price}</p>
      <p>{stock}</p>
      <p>{description}</p>
      <img src={image} alt={name} />
      <button onClick={() => deleteFavorite(id)}>Borrar</button>
    </article>
  );
};

export default Favorite;