import React from 'react';
import { useRedirectHome } from '../../../hooks/useRedirectHome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clean_cart } from '../../../redux/actions';
import NavBarUser from '../../User/NavBarUser/NavBarUser';
import NavBarAdmin from '../../Admin/NavBarAdmin/NavBarAdmin';

const NavBar = () => {
    const user = useSelector((state) => state.user);

    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    console.table(cart)
    useRedirectHome();

    return (
        <nav>
            {user && user.type == 'User' && <NavBarUser />}

            {user && user.type == 'Admin' && <NavBarAdmin />}

            <p>longitud del carrito {cart.length}</p>

            <button onClick={() => dispatch(clean_cart())}>Borrar carrito</button>

            {user && <></>
                // <div>
                //     <div>
                //         <img src={user.image} alt="Imagen de perfil" />
                //         <p>{`${user.name} ${user.lastName}`}</p>
                //     </div>
                // </div>
            }
        </nav>
    )
}

export default NavBar