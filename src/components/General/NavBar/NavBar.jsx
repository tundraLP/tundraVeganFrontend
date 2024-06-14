import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRedirectHome } from '../../../hooks/useRedirectHome';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import NavBarUser from '../../User/NavBarUser/NavBarUser';
import NavBarAdmin from '../../Admin/NavBarAdmin/NavBarAdmin';
import LinkNavBar from '../LinkNavBar/LinkNavBar';
import './NavBar.css';
import Avatar from '../Avatar/Avatar';

const NavBar = () => {
    const user = useSelector((state) => state.user);

    const cart = useSelector((state) => state.cart);

    // useLocalStorage();

    // useEffect(() => {

    //     if (user) {
    //         const date = new Date();

    //         const day = date.getDate();

    //         const putInLS = {
    //             day: day,
    //             cart: cart,
    //             id: user && user.id
    //         };

    //         const stringify = JSON.stringify(putInLS);

    //         localStorage.setItem('cart', stringify);
    //     };
    // }, [cart]);

    useRedirectHome();

    return (
        <nav className='nav'>

            <NavLink to={user ? '/Inicio' : '/'} className='link'>
                <h1> Tundra comida vegana</h1>
            </NavLink >

            <ul className='box-link'>
                {user && user.type == 'User' && <NavBarUser />}

                {user && user.type == 'Admin' && <NavBarAdmin />}
                
                {!user && <LinkNavBar />}
            </ul>

            {user && <Avatar {...user} />}

        </nav >
    )
}

export default NavBar