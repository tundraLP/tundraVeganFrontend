import React from 'react';
import './LoaderItem.css';

const LoaderItem = () => {
    return (
        <article className='card card-loader'>
            <div className='loader-img loader'></div>
            <div className='loader-name loader'></div>
            <div className='loader-price loader'></div>
            <div className='loader-desc loader'></div>
        </article>
    );
};

export default LoaderItem;