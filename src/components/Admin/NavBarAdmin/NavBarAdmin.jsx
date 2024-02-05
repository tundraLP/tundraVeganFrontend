import React from 'react';
import { Link } from 'react-router-dom';

const NavBarAdmin = () => {
  return (
    <>
      <li>
        <Link to={'/Administrar-usuarios'} className='linkNav'>Administrar usuarios</Link>
      </li>
      <li>
        <Link to={'/Ordenes-admin'} className='linkNav'>Ordenes</Link>
      </li>
    </>
  );
};

export default NavBarAdmin;