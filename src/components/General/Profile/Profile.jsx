import React from 'react';
import './Profile.css';
import InfoUser from '../InfoUser/InfoUser';
import BtnHome from '../BtnHome/BtnHome';

const Profile = () => {

    return (
        <section className='section-profile'>

            <BtnHome />

            <InfoUser />
            
        </section >
    );
};

export default Profile;