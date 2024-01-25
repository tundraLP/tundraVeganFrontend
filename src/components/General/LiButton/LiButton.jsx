import React from 'react';
import './LiButton.css';

const LiButton = ({ pageNumber, currentPage, onPageChange }) => {
    return (
        <li className={`li-pagination-container ${pageNumber === currentPage ? 'active' : ''}`}>
            <button className='button-pagination' onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
        </li>
    );
};

export default LiButton;