import React from 'react';
import './Pagination.css';
import LiButton from '../LiButton/LiButton';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      {
        pageNumbers.map((pageNumber) =>
          <LiButton key={pageNumber}
            currentPage={currentPage}
            onPageChange={onPageChange}
            pageNumber={pageNumber}
          />
        )
      }
    </ul>
  );
};

export default Pagination;