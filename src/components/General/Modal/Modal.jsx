import React from 'react';
import { useRef } from 'react';
import './Modal.css';

const Modal = ({ closeModal, message }) => {

    const modalRef = useRef();

    const handleContainerClick = (e) => {
        if (!modalRef.current.contains(e.target)) closeModal();
    };

    return (
        <div className='upperContainer' onClick={handleContainerClick}>
            <div className='innerContainer' ref={modalRef}>
                <p className='p-modal'>{message}</p>
                <button onClick={closeModal} className='button-modal'>Aceptar</button>
            </div>
        </div>
    );
};

export default Modal;