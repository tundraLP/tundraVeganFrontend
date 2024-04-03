import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import InfoInput from '../InfoInput/InfoInput';
import ButtonEye from '../ButtonEye/ButtonEye';
import './InfoUser.css';

const InfoUser = () => {

    const user = useSelector((state) => state.user);

    const [boolean, setBoolean] = useState(false);

    const password = boolean ? 'text' : 'password';

    const changeVisual = () => setBoolean(!boolean);

    return (
        <article className='article-profile'>
            <h3 className='title-profile'>Información personal</h3>
            <ul className='box-profile'>

                <li className='box-img'>
                    <img className='img' src={user.image} alt='User image'/>
                </li>
                <li className='box-input'>
                    <InfoInput id={"name"} label={"Nombre:"} type={"text"} value={user.name} button={false} />
                </li>

                <li className='box-input'>
                    <InfoInput id={"lastName"} label={"Apellido:"} type={"text"} value={user.lastName} button={false} />
                </li>

                <li className='box-input'>
                    <InfoInput id={"mail"} label={"Mail:"} type={"email"} value={user.mail} button={false} />
                </li>

                <li className='box-input'>
                    <InfoInput id={"adress"} label={"Dirección:"} type={"text"} value={user.adress} button={false} />
                </li>

                <li className='box-input'>
                    <InfoInput id={"password"} label={"Contraseña:"} type={password} value={user.password} button={<ButtonEye boolean={boolean} changeVisual={changeVisual} />} />
                </li>
            </ul>

            <NavLink to={"/Actualizar-usuario"}>
                <div className='modifyData'>
                <button className='button-form'>Modificar Datos</button>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                </svg>
                </div>
            </NavLink>
        </article>
    )
}

export default InfoUser