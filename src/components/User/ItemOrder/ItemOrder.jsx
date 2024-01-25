import React from 'react';
import './ItemOrder.css';

const ItemOrder = ({ product, count }) => {

    const finalPrice = product.price * count;

    return (
        <div className='item-order-card'>
            <img src={product.image} alt={product.name} className='img-item-order' />
            <p className='p'>{product.name}</p>
            <div className='box-price-count'>
                <p className='p'>{count} unidades pedidas</p>
                <p className='p price'>${finalPrice}</p>
            </div>
        </div>
    );
};

export default ItemOrder;