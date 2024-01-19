import React from 'react';

const InfoInput = ({ id, type, value, label, button }) => {
    return (
        <>
            <label htmlFor={id} className='label-form'>{label}</label>
            <div className='box-pass'>
                <input type={type} readOnly id={id} value={value} className='input-form' />
                {button && button}
            </div>
        </>
    );
};

export default InfoInput;