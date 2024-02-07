import React from 'react';
import { Link } from 'react-router-dom';
import CartNav from '../CartNav/CartNav';

const NavBarUser = () => {
  return (
    <>
      <li>
        <Link className='linkNav' to={'/Inicio'}>Inicio</Link>
      </li>
      <li>
        <Link className='linkNav' to={'/Mi-perfil'}>Mi perfil</Link>
      </li>
      <li>
        <Link className='linkNav' to={'/Favoritos'}>Favoritos</Link>
      </li>
      <li>
        <Link className='linkNav' to={'/Ordenes'}>Ordenes</Link>
      </li>
      <li>
        <Link className='linkNav' to={'/Sobre-nosotros'}>Sobre nosotros</Link>
      </li>
      <li>
        <CartNav />
      </li>
    </>
  );
};

export default NavBarUser;