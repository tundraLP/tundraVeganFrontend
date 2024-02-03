import React from 'react';
import { useState } from 'react';
import ReviewList from '../ReviewList/ReviewList';
import './ReviewsListContainer.css';

const ReviewsListContainer = () => {
    const [boolean, setBoolean] = useState(false);

    const changeBoolean = () => setBoolean(!boolean);

    return (
        <section className='section-review-detail'>
            <div className='box-head-review'>
                <h4>Reseñas</h4>
                <button onClick={changeBoolean} className='button-show-review'>
                    {boolean ? 'Ocultar reseñas' : 'Mostrar reseñas'}
                </button>
            </div>

            <ReviewList />
        </section>
    );
};

export default ReviewsListContainer;