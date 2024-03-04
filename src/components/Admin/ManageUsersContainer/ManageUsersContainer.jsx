import React, { useState } from 'react';
import './ManageUsersContainer.css';
import { useFetchUsers } from '../../../hooks/useFetchUsers';
import ManageUserList from '../ManageUserList/ManageUserList';
import { useSearchUser } from '../../../hooks/useSearchUser';

const ManageUsersContainer = () => {

    useFetchUsers();

    const [input, setInput] = useState("");

    const user = useSearchUser(input);

    const cleanInput = () => setInput("");

    return (
        <section className='section-manage-user'>

            <h2>Lista de usuarios</h2>

            <div className='box-search-user'>
                <label htmlFor="user" className='label-form'>Buscar usuario por mail:</label>
                <div className='box-input-search-user'>
                    <input
                        type="text"
                        className='input-search'
                        value={input}
                        name='user'
                        id='user'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={cleanInput}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <ManageUserList user={user} />
        </section>
    );
};

export default ManageUsersContainer;