import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sign_out } from '../../../redux/actions';
import './Avatar.css';

const Avatar = ({ name, lastName, image }) => {
    const dispatch = useDispatch();

    const signOut = () => dispatch(sign_out());

    return (
        <div className='box-avatar'>
            <Link to='/Mi-perfil'>
                <img src={image} alt={`${name} ${lastName}`} className='img-avatar' />
            </Link>
            <span className='p avatar-name'>{name} {lastName}</span>
            <button className='button-close-session' onClick={signOut}>Cerrar sesión</button>
        </div>
    );
};

export default Avatar;