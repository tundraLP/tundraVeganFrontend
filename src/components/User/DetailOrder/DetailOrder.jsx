import React from 'react';
import { useEffect, useState } from 'react';
import { months } from '../../../utils/const';
import ItemOrder from '../ItemOrder/ItemOrder';
import './DetailOrder.css';

const DetailOrder = ({ adress, createdAt, id, state, total, products }) => {

    const [date, setDate] = useState("");

    const style = state === 'Creado' ? 'red' : 'green';

    useEffect(() => {
        let completeDate = "";

        for (let i = 8; i <= 9; i++) {
            const letter = createdAt[i];
            completeDate += letter;
        };

        completeDate += " de ";

        let month = "";
        for (let i = 5; i <= 6; i++) {
            const letter = createdAt[i];
            month += letter;
        };

        const number = parseInt(month);

        month = months[number - 1];

        completeDate += `${month} del `;

        for (let i = 0; i <= 3; i++) {
            const letter = createdAt[i];
            completeDate += letter;
        };
        setDate(completeDate);
    }, []);


    return (
        <article className='card-detail-order'>
            <div className='box-date-id'>

                <p className='p'>{date}</p>

                <div className='box-id-order'>
                    <p className='p'>ID de la orden:</p>
                    <p className='p-id-order'>{id}</p>
                </div>

            </div>

            <div className='box-products-order'>
                <span className='span-products'>Productos pedidos</span>
                <div className='box-products-order-list'>
                    {
                        products.map((prod) => <ItemOrder key={prod.id} {...prod} />)
                    }
                </div>
            </div>

            <div className='box-info-order'>
                <p className='p'>Estado del pedido: <span className={style}>{state}</span></p>
                <p className='p'>Dirección del envio: {adress}</p>
                <p className='p'>Total del pedido: <span className='price'>${total.slice(0, -3)}</span></p>
            </div>
        </article>
    );
};

export default DetailOrder;