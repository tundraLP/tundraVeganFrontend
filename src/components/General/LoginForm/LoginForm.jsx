import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleError } from '../../../utils/styleError';
import { validateInput } from '../../../utils/validateInput';
import { clean_error, put_error, sign_in } from '../../../redux/actions';
import ButtonShown from '../ButtonShown/ButtonShown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { uriBack } from '../../../utils/const';

const LoginForm = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(clean_error());
  }, []);

  const error = useSelector((state) => state.error);

  // estados para los input

  const [input, setInput] = useState({ mail: "", password: "" });

  const [style, setStyle] = useState({ mail: "", password: "" });

  const [errorInput, setErrorInput] = useState({ mail: "", password: "" });

  const [shown, setShown] = useState({ password: false });

  const validateBoolean = errorInput.mail == "" && errorInput.password == "" && input.mail != "" && input.password != "";

  //funciones para manejar los input

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setErrorInput(validateInput({
      ...input,
      [e.target.name]: e.target.value
    }, errorInput));

    setStyle(styleError(errorInput, style));
  };

  const handleClick = (field) => {
    setShown(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // funcion para buscar el usuario en la bdd

  const getUser = async (mail, password) => {
    try {
      const user = await axios.get(`${uriBack}/user/getUser?mail=${mail}&password=${password}`).then((res) => res.data);
      dispatch(sign_in(user));
    } catch (error) {
      dispatch(put_error(error.response.data.error));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateBoolean) getUser(input.mail, input.password);
  }

  return (
    <form className='form' onSubmit={handleSubmit}>

      <div className="box-input">
        <label htmlFor="mail" className='label-form'>Mail:</label>
        <input type="email" value={input.mail} id='mail' name='mail' onChange={handleInput} className={`${style} input-form`} />
        <span className='span-form'>{errorInput.mail}</span>
      </div>

      <div className="box-input">
        <label htmlFor="password" className='label-form'>Contraseña:</label>

        <div className='box-pass'>
          <input type={shown.password ? "text" : "password"} value={input.password} id='password' name='password' onChange={handleInput} className={`${style} input-form`} />
          <ButtonShown boolean={shown.password} handleClick={handleClick} input={'password'} />
        </div>

        <span className='span-form'>{errorInput.password}</span>
      </div>

      <span className='span-form'>{error}</span>

      <button disabled={!validateBoolean}>Enviar</button>
    </form>
  );
};

export default LoginForm;