import React from 'react';
import './ItemOrder.css';

const ItemOrder = ({ product, count }) => {
    return (
        <div className='box-item'>
            <p className='p'>{product.name}</p>
            <p className='p'>{count} unidades pedidas</p>
        </div>
    );
};

export default ItemOrder;