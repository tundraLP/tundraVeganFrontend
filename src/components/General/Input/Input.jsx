import React from 'react';
import './Input.css';

const Input = ({ handleInput, style, input, errorInput, value }) => {

    const label = () => {
        let result;
        switch (input) {
            case "name":
                return result = "Nombre:";

            case "lastName":
                return result = "Apellido:";

            case "mail":
                return result = "Mail:";

            case "password":
                return result = "Contraseña:";

            case "confirmPassword":
                return result = "Repetir contraseña:";

            case "adress":
                return result = "Dirección:";

            default:
                break;
        };
        return result;
    };

    const type = () => {
        let result;
        switch (input) {
            case "name" || "lastName" || "adress":
                return result = "text";

            case "password" || "confirmPassword":
                return result = "password";

            case "mail":
                return result = "mail";
        };
        return result;
    };

    return (
        <li className='box-input'>
            <label htmlFor={input} className='label-form'>{label()}</label>
            <input type={type()} id={input} value={value} name={input} onChange={handleInput} className={`${style} input-form`} />
            <span className="span-form">{errorInput}</span>
        </li>
    )
}

export default Input