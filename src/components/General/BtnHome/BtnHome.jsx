import React from 'react';
import { NavLink } from 'react-router-dom';
import './BtnHome.css';

const BtnHome = () => {
  return (
    <NavLink className='back' to={'/Inicio'}>
      Volver
    </NavLink>
  )
}

export default BtnHome