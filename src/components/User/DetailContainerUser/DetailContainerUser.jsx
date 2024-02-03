import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { change_boolean_toasty, put_error } from '../../../redux/actions';
import { useFetchFavorite } from '../../../hooks/useFetchFavorite'
import { uriBack } from '../../../utils/const';
import { useFavorites } from '../../../hooks/useFavorites';
import { useGetDetail } from '../../../hooks/useGetDetail';
import { useFetchReviews } from '../../../hooks/useFetchReviews';
import { ToastContainer } from 'react-toastify';
import DetailUser from '../DetailUser/DetailUser';
import axios from 'axios';
import './DetailContainerUser.css';
import ReviewsListContainer from '../ReviewsListContainer/ReviewsListContainer';

const DetailContainerUser = () => {

  const [boolean, setBoolean] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const detail = useSelector((state) => state.detail);

  const user = useSelector((state) => state.user);

  const favorites = useSelector((state) => state.favorites);

  useFetchFavorite(user && user.id, boolean);

  useGetDetail(id, products);

  useEffect(() => {
    return () => dispatch(change_boolean_toasty());
  }, []);

  const requestFavorite = async () => {
    const findFavorite = favorites.find((prod) => prod.ProductId === id);

    const data = {
      UserId: user && user.id,
      ProductId: id
    };

    try {
      if (findFavorite == undefined) {
        await axios.post(`${uriBack}/favorite/createFavorite`, data).then((res) => res.data);
        setBoolean(!boolean);
      };

      if (findFavorite) {
        await axios.delete(`${uriBack}/favorite/deleteFavorite`, { data: { id: findFavorite.id } }).then((res) => res.data);
        setBoolean(!boolean);
      };

    } catch (error) {
      dispatch(put_error(error.response.data.error));
    };
  };

  const style = useFavorites(id);

  useFetchReviews(id);

  return (
    <section className='detail-container'>

      {detail && <DetailUser {...detail} style={style} requestFavorite={requestFavorite} />}

      <ToastContainer
        position={'bottom-right'}
        autoClose={4000}
        hideProgressBar={true}
        pauseOnHover={true}
        draggable={false}
        closeButton={false}
      />

      <ReviewsListContainer />

    </section>
  );
};

export default DetailContainerUser;