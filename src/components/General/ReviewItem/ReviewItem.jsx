import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_review } from '../../../redux/actions';
import Modal from '../Modal/Modal';
import axios from 'axios';
import './ReviewItem.css';
import { uriBack } from '../../../utils/const';

const ReviewItem = ({ clientName, date, review, stars, id, ProductId }) => {

    const dispatch = useDispatch();

    const [starsToRender, setStarsToRender] = useState([]);

    const [message, setMessage] = useState('');

    const [boolean, setBoolean] = useState(false);

    const getReview = async () => {
        const request = await axios.get(`${uriBack}/review/getProductReviews?ProductId=${ProductId}`).then((res) => res.data);

        dispatch(get_review(request));
    };

    const closeModal = () => {
        setBoolean(!boolean);
        getReview();
    };

    const user = useSelector((state) => state.user);

    useEffect(() => {
        const array = [];

        for (let i = 1; i <= 10; i++) {
            let style = '';

            if (i <= stars) style = 'starFilled';

            const star =
                <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-star-filled ${style}`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffec00" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" strokeWidth="0" fill="currentColor" />
                </svg>;

            array.push(star);
        };

        setStarsToRender(array);
    }, []);

    const deleteReview = async () => {
        try {
            const response = await axios.delete(`${uriBack}/review/deleteReview`, { data: { id } }).then((res) => res.data);
            setMessage(response.message);
            setBoolean(!boolean);
        } catch (error) {
            console.log(error);
            setBoolean(!boolean);
        };
    };

    const style = user.type == 'Admin' ? 'border-and-padding' : '';

    return (
        <li className='box-review-item' key={id}>

            <div className='box-date-name-item'>
                <p className='p'>{clientName}</p>

                <p className='p'>{date}</p>
            </div>

            <div className={`box-review-stars-item ${style}`}>
                <p className='p'>{review}</p>

                <div className='box-stars-item'>
                    {starsToRender.map((star) => star)}
                </div>
            </div>

            {
                user.type == 'Admin' &&
                <div className='box-delete-review'>
                    <p className='p'>Elimina la review</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={deleteReview}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </div>
            }

            {boolean && <Modal closeModal={closeModal} message={message} key={'modal'} />}
        </li>
    );
};

export default ReviewItem;