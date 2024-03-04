import React from 'react';
import { useState, useEffect } from 'react';
import { Review } from '../../../utils/classReview';
import { useDispatch, useSelector } from 'react-redux';
import { clean_error, get_review, put_error } from '../../../redux/actions';
import { uriBack } from '../../../utils/const';
import axios from 'axios';
import Modal from '../../General/Modal/Modal';

const CreateReviewForm = ({ id }) => {

    const user = useSelector((state) => state.user);

    const error = useSelector((state) => state.error);

    const [booleanModal, setBooleanModal] = useState(false);

    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const [starsToRender, setStarsToRender] = useState([]);

    const [input, setInput] = useState("");

    const [starsPoint, setStarsPoint] = useState(0);

    const handleStars = (i) => setStarsPoint(i);

    const closeModal = () => setBooleanModal(!booleanModal);

    const boolean = input != "" && input != " ";

    useEffect(() => {
        const array = [];

        for (let i = 1; i <= 10; i++) {
            let style = '';

            if (i <= starsPoint) style = 'starFilled';

            const star =
                <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-star-filled ${style}`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffec00" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => handleStars(i)}>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" strokeWidth="0" fill="currentColor" />
                </svg>;

            array.push(star);
        };

        setStarsToRender(array);
    }, [starsPoint]);

    const createReview = async (review) => {
        try {
            const res = await axios.post(`${uriBack}/review/createReview`, review).then((res) => res.data);

            setMessage(res.message);

            setBooleanModal(!booleanModal);

            const response = await axios.get(`${uriBack}/review/getProductReviews?ProductId=${id}`).then((res) => res.data);

            dispatch(get_review(response));
        } catch (error) {
            dispatch(put_error(error.response.data));
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const review = new Review(input, starsPoint, user.name, id, user.id);

        if (boolean) createReview(review);
    };

    useEffect(() => {
        return () => dispatch(clean_error());
    }, []);

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>

                <legend className='legend'>Crea tu reseña</legend>

                <div className='box-input'>
                    <label htmlFor="review" className='label-form'>Deja tu reseña:</label>
                    <textarea
                        name="review"
                        id="review"
                        cols="30"
                        rows="10"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>

                <div className='box-input'>
                    <label htmlFor="star" className='label-form'>Puntaje del producto:</label>
                    <div>
                        {starsToRender.map((star) => star)}
                    </div>
                </div>

                <button type='submit' className='button-form' disabled={!boolean}>Crear</button>

                <span className='span-form'>{error}</span>

                {booleanModal && <Modal closeModal={closeModal} message={message} key={'message'} />}

            </form>
        </>
    );
};

export default CreateReviewForm;