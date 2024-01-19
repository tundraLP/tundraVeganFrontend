import React from 'react';
import FavoriteList from '../FavoriteList/FavoriteList';
import './FavoriteListContainer.css';

const FavoriteListContainer = () => {
  return (
    <section className='section-favorite'>

      <h2>Tus favoritos</h2>

      <FavoriteList />
      
    </section>
  );
};

export default FavoriteListContainer;