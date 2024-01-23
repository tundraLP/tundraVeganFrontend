import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={pageNumber === currentPage ? 'active' : ''}>
            <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;