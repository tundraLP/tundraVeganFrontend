import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchFavorite } from '../../../hooks/useFetchFavorite';
import { useFindProductsFav } from '../../../hooks/useFindProductsFav'
import { put_error } from '../../../redux/actions';
import { uriBack } from '../../../utils/const';
import axios from 'axios';
import Favorite from '../Favorite/Favorite';

const FavoriteList = () => {

  const [boolean, setBoolean] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`${uriBack}/favorite/deleteFavorite`, { data: { id } }).then((res) => res.data);
      setBoolean(!boolean);
    } catch (error) {
      dispatch(put_error(error.response.data.error))
    };
  };

  useFetchFavorite(user.id, boolean);

  const render = useFindProductsFav();

  return (
    <div>
      {
        render.length > 0 ?
          render.map((fav) => <Favorite key={fav.id} {...fav} deleteFavorite={deleteFavorite} />)
          : <h3>No tenes favoritos</h3>
      }
    </div>
  );
};

export default FavoriteList;