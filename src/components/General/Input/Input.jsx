import React from 'react';
import './Input.css';

const Input = ({ handleInput, style, errorInput, value, label, button, type, id, name }) => {

    return (
        <li className='box-input'>
            <label htmlFor={id} className='label-form'>{label}</label>
            <div className='box-pass'>
                <input type={type} id={id} value={value} name={name} onChange={handleInput} className={`${style} input-form`} />
                {button && button}
            </div>
            <span className="span-form">{errorInput}</span>
        </li>
    )
}

export default Input