import React from 'react';
import { useState, useEffect } from 'react';
import { validateInput } from '../../../utils/validateInput';
import { styleError } from '../../../utils/styleError';
import { useDispatch, useSelector } from 'react-redux';
import { clean_error, put_error } from '../../../redux/actions';
import { uriBack } from '../../../utils/const';
import { useNavigate } from 'react-router-dom';
import ButtonShown from '../ButtonShown/ButtonShown';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {

  useEffect(() => {
    return () => dispatch(clean_error());
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const error = useSelector((state) => state.error);

  // estados para los inputs, con sus errores y estilos para modelar los input

  const [input, setInput] = useState({ name: "", lastName: "", mail: "", adress: "", password: "", confirmPassword: "" });

  const [style, setStyle] = useState({ name: "", lastName: "", mail: "", password: "", confirmPassword: "", adress: "" });

  const [errorInput, setErrorInput] = useState({ name: "", lastName: "", mail: "", password: "", confirmPassword: "", adress: "", passNoMatch: "" });

  const [shown, setShown] = useState({ password: false, confirmPassword: false });

  const validateBoolean = errorInput.name == "" && errorInput.lastName == "" && errorInput.mail == "" && errorInput.password == "" && errorInput.confirmPassword == "" && errorInput.passNoMatch == "" && input.name != "" && input.lastName != "" && input.password != "";

  // funcion para manejar los inputs

  const handleClick = (field) => {
    setShown(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setErrorInput(validateInput({
      ...input, [e.target.name]: e.target.value
    }, errorInput));

    setStyle(styleError(errorInput, style));
  };

  const createUser = async (user) => {
    try {
      await axios.post(`${uriBack}/user/createUser`, user).then((res) => res.data);
      setTimeout(() => { navigate('/') }, 1500);
    } catch (error) {
      dispatch(put_error(error.response.data.error));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: input.name,
      lastName: input.lastName,
      mail: input.mail,
      password: input.password,
      adress: input.adress
    };

    if (validateBoolean) createUser(user);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <legend className='legend'>Ingresa tus datos:</legend>
      <ul className='ul-form'>

        <li className='box-input'>
          <label htmlFor="name" className='label-form'>Nombre:</label>
          <input type="text" id="name" value={input.name} name="name" onChange={handleInput} className={`${style} input-form`} />
          <span className="span-form">{errorInput.name}</span>
        </li>

        <li className='box-input'>
          <label htmlFor="lastName" className='label-form'>Apellido:</label>
          <input type="text" id="lastName" value={input.lastName} name="lastName" onChange={handleInput} className={`${style} input-form`} />
          <span className="span-form">{errorInput.lastName}</span>
        </li>

        <li className='box-input'>
          <label htmlFor="mail" className='label-form'>Mail:</label>
          <input type="email" id="mail" value={input.mail} name="mail" onChange={handleInput} className={`${style} input-form`} />
          <span className="span-form">{errorInput.mail}</span>
        </li>

        <li className='box-input'>
          <label htmlFor="adress" className='label-form'>Dirección:</label>
          <input type="text" id="adress" value={input.adress} name="adress" onChange={handleInput} className={`${style} input-form`} />
          <span className="span-form">{errorInput.adress}</span>
        </li>

        <li className='box-input'>
          <label htmlFor="password" className='label-form'>Contraseña:</label>
          <div className='box-pass'>
            <input type={shown.password ? "text" : "password"} id="password" value={input.password} name="password" onChange={handleInput} className={`${style} input-form`} />
            <ButtonShown boolean={shown.password} handleClick={handleClick} input={'password'} />
          </div>
          <span className="span-form">{errorInput.password}</span>
        </li>

        <li className='box-input'>
          <label htmlFor="confirmPassword" className='label-form'>Repetir contraseña:</label>
          <div className='box-pass'>
            <input type={shown.confirmPassword ? "text" : "password"} id="confirmPassword" value={input.confirmPassword} name="confirmPassword" onChange={handleInput} className={`${style} input-form`} />
            <ButtonShown boolean={shown.confirmPassword} handleClick={handleClick} input={'confirmPassword'} />
          </div>
          <span className="span-form">{errorInput.confirmPassword}</span>
        </li>

      </ul>

      <span className='span-form'>{errorInput.passNoMatch}</span>

      <span className='span-form'>{error}</span>

      <button disabled={!validateBoolean}>Enviar</button>
    </form>
  );
};

export default RegisterForm;