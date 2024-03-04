import React from 'react';
import DetailAdmin from '../DetailAdmin/DetailAdmin';
import './DetailContainerAdmin.css';
import { useGetDetail } from '../../../hooks/useGetDetail';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReviewsListContainer from '../../General/ReviewsListContainer/ReviewsListContainer';
import { useFetchReviews } from '../../../hooks/useFetchReviews';

const DetailContainerAdmin = () => {

  const products = useSelector((state) => state.products);

  const detail = useSelector((state) => state.detail);

  const { id } = useParams();

  useGetDetail(id, products);

  useFetchReviews(id);

  return (
    <section className='section-detail-admin'>

      <h3>Detalles del producto</h3>

      {detail && <DetailAdmin {...detail} />}

      <ReviewsListContainer />

      {/* aca poner el form de updateProduct y pasarle por props lo que necesita*/}
    </section>
  );
};

export default DetailContainerAdmin;