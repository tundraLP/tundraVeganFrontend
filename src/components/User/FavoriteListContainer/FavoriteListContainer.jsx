import React from 'react';
import FavoriteList from '../FavoriteList/FavoriteList';
import BtnHome from '../../General/BtnHome/BtnHome';
import './FavoriteListContainer.css';

const FavoriteListContainer = () => {
  return (
    <section className='section-favorite'>

      <BtnHome/>

      <h2>Tus favoritos</h2>

      <FavoriteList />
      
    </section>
  );
};

export default FavoriteListContainer;