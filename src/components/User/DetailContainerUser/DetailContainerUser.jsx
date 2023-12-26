import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { add_to_cart, clean_detail, get_detail } from '../../../redux/actions';
import DetailUser from '../DetailUser/DetailUser';

const DetailContainerUser = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const detail = useSelector((state) => state.detail);

  useEffect(() => {

    const product = products.find((prod) => prod.id === id);

    dispatch(get_detail(product));

    return () => dispatch(clean_detail());
  }, [id]);

  return (
    <section>

      <DetailUser {...detail} />

    </section>
  );
};

export default DetailContainerUser;