import React, { useEffect, useState } from 'react';
import DetailAdmin from '../DetailAdmin/DetailAdmin';
import './DetailContainerAdmin.css';
import { useGetDetail } from '../../../hooks/useGetDetail';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReviewsListContainer from '../../General/ReviewsListContainer/ReviewsListContainer';
import { useFetchReviews } from '../../../hooks/useFetchReviews';
import FormUpdateProduct from '../FormUpdateProduct/FormUpdateProduct';

const DetailContainerAdmin = () => {

  const products = useSelector((state) => state.products);

  const detail = useSelector((state) => state.detail);

  const [updateOn, setUpdateOn] = useState(false);
  const { id } = useParams();

  useGetDetail(id, products);

  useFetchReviews(id);

  useEffect(()=>{
    return ()=>{setUpdateOn(false)}
  }, []);

  return (<>
    {updateOn == false ? <section className='section-detail-admin'>

      <h3>Detalles del producto</h3>

      <button className='button-form' onClick={(e)=>{e.preventDefault();setUpdateOn(!updateOn)}}>Modificar producto</button>
      {detail && <DetailAdmin {...detail} />}

      <ReviewsListContainer />

    </section> : <section className='section-update-product'>
      {/* aca poner el form de updateProduct y pasarle por props lo que necesita*/}
      <h3>Modificar producto</h3>  

      {detail && < FormUpdateProduct product={detail} setUpdateOn={setUpdateOn} updateOn={updateOn} />}
      
      </section>
    }
  </>
  );
};

export default DetailContainerAdmin;