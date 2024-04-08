import React, { useEffect, useState } from 'react';
import DetailAdmin from '../DetailAdmin/DetailAdmin';
import './DetailContainerAdmin.css';
import { useGetDetail } from '../../../hooks/useGetDetail';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReviewsListContainer from '../../General/ReviewsListContainer/ReviewsListContainer';
import { useFetchReviews } from '../../../hooks/useFetchReviews';
import FormUpdateProduct from '../FormUpdateProduct/FormUpdateProduct';
import Modal from '../../General/Modal/Modal';

const DetailContainerAdmin = () => {

  const products = useSelector((state) => state.products);

  const detail = useSelector((state) => state.detail);

  const [updateOn, setUpdateOn] = useState(false);

  const [boolean, setBoolean] = useState(false);

  const [message, setMessage] = useState('');

  const { id } = useParams();

  useGetDetail(id, products);

  useFetchReviews(id);

  useEffect(() => {
    return () => { setUpdateOn(false) }
  }, []);

  const chargeMessage = (mes) => {
    setMessage(mes);
    setBoolean(!boolean);
  };

  const closeModal = () => setBoolean(!boolean);

  const changeUpdate = () => setUpdateOn(!updateOn);

  return (<>
    {
      updateOn == false ?
        <section className='section-detail-admin'>

          <h3>Detalles del producto</h3>

          <button className='button-form' onClick={changeUpdate}>Modificar producto</button>

          {detail && <DetailAdmin {...detail} />}

          {boolean && <Modal closeModal={closeModal} message={message} key={'message'} />}

          <ReviewsListContainer />

        </section>
        :
        <section className='section-update-product'>

          <h3>Modificar producto</h3>

          {detail && < FormUpdateProduct product={detail} changeUpdate={changeUpdate} updateOn={updateOn} chargeMessage={chargeMessage} />}

        </section>
    }
  </>
  );
};

export default DetailContainerAdmin;