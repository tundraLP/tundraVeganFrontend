import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrder } from '../../../hooks/useGetOrder';
import { clean_detail } from '../../../redux/actions';
import DetailOrder from '../DetailOrder/DetailOrder';
import './DetailOrderContainer.css';

const DetailOrderContainer = () => {

    const dispatch = useDispatch();

    const { orderId } = useParams();

    const detail = useSelector((state) => state.detail);

    useGetOrder(orderId);

    useEffect(() => {
        return () => dispatch(clean_detail());
    }, []);

    return (
        <section className='section-detail-order'>

            <h2>Detalles de tu orden</h2>

            {detail && <DetailOrder {...detail} />}
        </section>
    );
};

export default DetailOrderContainer;