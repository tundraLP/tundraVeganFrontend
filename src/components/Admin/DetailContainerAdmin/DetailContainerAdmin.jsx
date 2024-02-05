import React from 'react';
import DetailAdmin from '../DetailAdmin/DetailAdmin';
import './DetailContainerAdmin.css';
import { useGetDetail } from '../../../hooks/useGetDetail';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DetailContainerAdmin = () => {

  const products = useSelector((state) => state.products);

  const detail = useSelector((state) => state.detail);

  const { id } = useParams();

  useGetDetail(id, products);

  return (
    <section className='section-detail-admin'>

      <h3>Detalles del producto</h3>

      {detail && <DetailAdmin {...detail} />}

      {/* aca poner el form de updateProduct y pasarle por props lo que necesita*/}
    </section>
  );
};

export default DetailContainerAdmin;