import React from 'react';
import { useRedirectHome } from '../../../hooks/useRedirectHome';
import { useSelector } from 'react-redux';
import NavBarUser from '../../User/NavBarUser/NavBarUser';
import NavBarAdmin from '../../Admin/NavBarAdmin/NavBarAdmin';

const NavBar = () => {
    const user = useSelector((state) => state.user);

    useRedirectHome();

    return (
        <nav>
            {user && user.type == 'User' && <NavBarUser />}

            {user && user.type == 'Admin' && <NavBarAdmin />}

            {user &&
                <div>
                    <div>
                        <img src={user.image} alt="Imagen de perfil" />
                        <p>{`${user.name} ${user.lastName}`}</p>
                    </div>
                </div>
            }
        </nav>
    )
}

export default NavBar