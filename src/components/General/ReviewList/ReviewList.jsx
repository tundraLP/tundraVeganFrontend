import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Pagination from '../Pagination/Pagination';
import ButtonPagination from '../ButtonPagination/ButtonPagination';
import './ReviewList.css';

const ReviewList = () => {

    const reviews = useSelector((state) => state.reviews);

    const [currentPage, setCurrentPage] = useState(1);
    const [quantityPerPage, setQuantityPerPage] = useState(6);
    const totalPages = Math.ceil(reviews.length / quantityPerPage);

    const firstIndex = (currentPage - 1) * quantityPerPage;
    const lastIndex = Math.min(firstIndex + quantityPerPage, reviews.length);

    const quantityOptions = [6, 12, reviews.length];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleQuantityChange = (num) => {
        setQuantityPerPage(num);
        setCurrentPage(1);
    };

    return (
        <>
            <ul className='ul-review-list'>
                {
                    reviews.length > 0 ?
                        reviews.slice(firstIndex, lastIndex).map((review) => <ReviewItem key={review.id} {...review} />)
                        : <h3>Este producto todavía no tiene reseñas</h3>
                }
            </ul>

            <section className='section-pagination'>
                {
                    reviews.length > 0 &&
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                }
                <div className="container-options">

                    <span className='span-options'>Filtrar cantidad de reseñas mostradas</span>

                    <div className='container-options-quantity'>
                        {
                            quantityOptions.map((option) =>
                                <ButtonPagination
                                    key={option}
                                    quantityPerPage={quantityPerPage}
                                    handleQuantityChange={handleQuantityChange}
                                    option={option}
                                />
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReviewList;