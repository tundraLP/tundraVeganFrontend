import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderUser.css';
import { months } from '../../../utils/const'

const OrderUser = ({ state, total, id, createdAt }) => {

    const [date, setDate] = useState("");

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

    const style = state == "Creado" ? "red" : "green";

    return (
        <article className='card-order'>
            <div className='box-first'>
                <p className='date'>{date}</p>
                <Link className='link-detail' to={`/Detalle-pedido/${id}`}>Detalle del pedido</Link>
            </div>
            <div className='box-id'>
                <p className='p'>ID de la orden:</p>
                <p className='p'>{id}</p>
            </div>
            <div className='box-state'>
                <p className='p'>Estado del pedido:</p>
                <p className={`p ${style}`}>{state}</p>
            </div>
        </article>
    );
};

export default OrderUser;