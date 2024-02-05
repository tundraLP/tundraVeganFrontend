import React from 'react';
import { useSelector } from 'react-redux';
import ReviewItem from '../ReviewItem/ReviewItem';
import './ReviewList.css';

const ReviewList = () => {

    const reviews = useSelector((state) => state.reviews);
    
    return (
        <ul className='ul-review-list'>
            {
                reviews.length > 0 ?
                reviews.map((review) => <ReviewItem key={review.id} {...review} />)
                : <h3>Este producto todavía no tiene reseñas</h3>
            }
        </ul>
    );
};

export default ReviewList;