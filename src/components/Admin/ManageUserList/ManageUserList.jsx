import React from 'react';
import { useSelector } from 'react-redux';
import ManageUser from '../ManageUser/ManageUser';
import './ManageUserList.css';

const ManageUserList = ({ user }) => {

    const clients = useSelector((state) => state.clients);
    const userLogged = useSelector((state) => state.user);

    return (
        <ul className='list-users'>
            {
                user == undefined ?
                    clients.map((client) => userLogged.id != client.id && <ManageUser key={client.id} {...client} />)
                    : <ManageUser key={user.id} {...user} />
            }
        </ul>
    );
};

export default ManageUserList;