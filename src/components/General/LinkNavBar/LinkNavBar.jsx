import React from 'react';
import { Link } from 'react-router-dom';
import './LinkNavBar.css';

const LinkNavBar = () => {
    return (
        <>
            <li>
                <Link className='linkNav' to={'/Iniciar-sesion'}>Iniciar sesión</Link>
            </li>
            <li>
                <Link className='linkNav' to={'/Registrarse'}>Registrarse</Link>
            </li>
        </>
    );
};

export default LinkNavBar;