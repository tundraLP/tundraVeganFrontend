import React from 'react';

const DetailAdmin = ({ name, image, price, stock, description, Type }) => {
  return (
    <article className='card-detail'>
      <img src={image} alt={name} className='img-detail' />
      <div className='box-data'>
        <h4 className='p'>{name}</h4>
        <p className="p">{Type.name}</p>
        <p className='p'>Quedan {stock} unidades en stock</p>
        <p className="p category">{description}</p>
        <p className='p price'>${price.slice(0, -3)}</p>
      </div>
    </article>
  );
};

export default DetailAdmin;