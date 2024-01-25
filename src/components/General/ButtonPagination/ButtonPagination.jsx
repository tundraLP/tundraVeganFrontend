import React from 'react';
import './ButtonPagination.css';

const ButtonPagination = ({ option, quantityPerPage, handleQuantityChange }) => {
    return (
        <button
            className={`button-option-quantity ${option === quantityPerPage ? 'active-button-quantity' : ''}`}
            onClick={() => handleQuantityChange(option)}
            disabled={option === quantityPerPage}
        >
            {option}
        </button>
    );
};

export default ButtonPagination;