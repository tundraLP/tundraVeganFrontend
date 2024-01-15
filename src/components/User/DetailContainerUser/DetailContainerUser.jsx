import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { put_error } from '../../../redux/actions';
import { useFetchFavorite } from '../../../hooks/useFetchFavorite'
import { uriBack } from '../../../utils/const';
import { useFavorites } from '../../../hooks/useFavorites';
import { useGetDetail } from '../../../hooks/useGetDetail';
import DetailUser from '../DetailUser/DetailUser';
import axios from 'axios';

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

  return (
    <section>

      <DetailUser {...detail} style={style} requestFavorite={requestFavorite} />

    </section>
  );
};

export default DetailContainerUser;