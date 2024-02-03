import React from 'react';
import { useSelector } from 'react-redux';
import ReviewItem from '../ReviewItem/ReviewItem';

const ReviewList = () => {

    const reviews = useSelector((state) => state.reviews);

    console.log(reviews)
    return (
        <ul>
            {reviews.map((review) => <ReviewItem key={review.id} {...review} />)}
        </ul>
    );
};

export default ReviewList;