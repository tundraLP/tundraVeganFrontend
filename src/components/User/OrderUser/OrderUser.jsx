import React from 'react';
import { useFindProductsOrder } from '../../../hooks/useFindProductsOrder';
import ItemOrder from '../ItemOrder/ItemOrder';

const OrderUser = ({ state, adress, total, id, createdAt }) => {

    // const date = createdAt.slice(0, 9);

    const products = useFindProductsOrder(id);

    console.log(products)
    return (
        <article>
            <p>Estado del pedido: {state}</p>
            <p>Dirección de envio: {adress}</p>
            {
                products.map((prod) => <ItemOrder key={prod.id} {...prod} />)
            }
            <p>Total de la orden: ${total}</p>
        </article>
    );
};

export default OrderUser;