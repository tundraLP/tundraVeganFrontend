import React, { useState } from 'react';
import Modal from '../../General/Modal/Modal';
import axios from 'axios';
import { uriBack } from '../../../utils/const';
import './ManageUser.css';
import { useDispatch } from 'react-redux';
import { get_clients } from '../../../redux/actions'

const ManageUser = ({ name, mail, lastName, id, type }) => {

    const dispatch = useDispatch();

    const input = { user: 'User', admin: 'Admin' };

    const [stateToSend, setStateToSend] = useState(type);

    const [boolean, setBoolean] = useState(false);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.value == input.user) setStateToSend(e.target.value);
        if (e.target.value == input.admin) setStateToSend(e.target.value);
    };

    const closeModal = () => setBoolean(!boolean);

    const handleClick = async () => {
        const info = { UserId: id, type: stateToSend };
        try {
            const response = await axios.put(`${uriBack}/user/updateUser`, info).then((res) => res.data);
            setMessage(response.message);
            setBoolean(!boolean);
            const reloadUsers = await axios.get(`${uriBack}/user/getUsersAdmin`).then((res) => res.data);
            dispatch(get_clients(reloadUsers));
        } catch (error) {
            setMessage(error.response.data);
            setBoolean(!boolean);
        };
    };

    return (
        <article className='card-user'>
            <div className='box-info-user'>
                <p className='p'>Nombre y apellido: {name} {lastName}</p>
                <p className='p'>Mail: {mail}</p>

            </div>
            <div className='box-update-type-admin'>
                <p className='p'>Tipo de usuario: {type == 'User' ? 'Cliente' : 'Administrador'}</p>

                <div className='box-select-order-state'>
                    <button className='button-update-order' onClick={handleClick}>Actualizar</button>
                    <label className='label-form' htmlFor="type">Actualiza el usuario:</label>

                    <select name="type" id="type" className='select-item' onChange={handleChange}>
                        {type == 'User' ? <>
                            <option key={'User'} value={input.user}>Cliente</option>
                            <option key={'Admin'} value={input.admin}>Administrador</option>
                        </> : <>
                            <option key={'Admin'} value={input.admin}>Administrador</option>
                            <option key={'User'} value={input.user}>Cliente</option>
                        </>}
                    </select>

                </div>
            </div>

            {boolean && <Modal closeModal={closeModal} message={message} key={'modal'} />}
        </article>
    )
}

export default ManageUser