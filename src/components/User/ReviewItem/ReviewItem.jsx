import React from 'react';
import { useState } from 'react';
import './ReviewItem.css';

const ReviewItem = ({ clientName, date, review, stars }) => {

    const [starsToRender, setStarsToRender] = useState(() => {
        const array = [];

        for (let i = 1; i < 6; i++) {
            let style = '';

            if (i <= stars) style = 'starFilled';

            const star =
                <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-star-filled ${style}`} width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffec00" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" strokeWidth="0" fill="currentColor" />
                </svg>;

            array.push(star);
        };

        return array;
    });

    return (
        <li className='box-review-item'>

            <div className='box-date-name-item'>
                <p className='p'>{clientName}</p>

                <p className='p'>{date}</p>
            </div>

            <div className='box-review-stars-item'>
                <p className='p'>{review}</p>

                <div className='box-stars-item'>
                    {starsToRender.map((star) => star)}
                </div>
            </div>

        </li>
    );
};

export default ReviewItem;