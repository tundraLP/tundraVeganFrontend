import React from 'react';

const ItemOrder = ({ product, count }) => {
    return (
        <div>
            <p>{product.name}</p>
            <p>{count}</p>
        </div>
    );
};

export default ItemOrder;