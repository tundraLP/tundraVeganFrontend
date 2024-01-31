import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleError } from '../../../utils/styleError';
import { validateInput } from '../../../utils/validateInput';
import { clean_error, put_error, sign_in } from '../../../redux/actions';
import { uriBack } from '../../../utils/const';
import { auth, provider } from './Config';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ButtonShown from '../ButtonShown/ButtonShown';
import axios from 'axios';
import Input from '../Input/Input';
import './LoginForm.css'


const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => dispatch(clean_error());
  }, []);

  const error = useSelector((state) => state.error);

  const [userAux, setUserAux] = useState({ mail: '', password: '' });
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

  const createUser = async (user) => {
    try {
      await axios.post(`${uriBack}/user/createUser`, user).then((res) => res.data);
      setTimeout(() => { }, 1500);
    } catch (error) {
      dispatch(put_error(error.response.data.error));
    };
  };

  const verifyIfUserExists = async (mail) => {
    try {
      const response = await axios.get(`${uriBack}/user/isUser?mail=${mail}`).then((res) => res.data);
      return response;
    } catch (error) {
      dispatch(put_error(error.response.data.error));
    };
  };

  const handleClickGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const googlePassDefault = 'Google123.';
      const nameAux = data.user.displayName;

      const spaceIndex = nameAux.lastIndexOf(' ');
      const firstName = nameAux.slice(0, spaceIndex);
      const lastName = nameAux.slice(spaceIndex + 1);

      const signedUser = {
        mail: data.user.email,
        password: googlePassDefault,
        name: firstName,
        lastName: lastName,
        image: data.user.photoURL,
        type: 'User',
        adress: '      ' //Lo deja sin llenar para que el usuario lo haga. Podemos hacerlo asi y obligarlo a llenarlo al pedir un prod, o agregar un input antes de crear el usuario.
      };
      setUserAux(signedUser);

      const ok = await verifyIfUserExists(data.user.email);
      if (!ok) await createUser(signedUser);
      await getUser(data.user.email, googlePassDefault);
      navigate('/');
    } catch (error) {
      dispatch(put_error(error));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateBoolean) getUser(input.mail, input.password);
  };

  return (
    <section className='section-form'>

      <form className='form' onSubmit={handleSubmit}>

        <Input
          button={false}
          errorInput={errorInput.mail}
          handleInput={handleInput}
          id={"mail"}
          label={"Mail:"}
          name={"mail"}
          style={style.mail}
          type={"email"}
          value={input.mail}
          key={"mail"}
        />

        <Input
          button={<ButtonShown boolean={shown.password} handleClick={handleClick} input={'password'} />}
          errorInput={errorInput.password}
          handleInput={handleInput}
          id={"password"}
          label={"Contraseña:"}
          name={"password"}
          style={style.password}
          type={shown.password ? "text" : "password"}
          value={input.password}
          key={"password"}
        />

        <div className='box-google-button'>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" className="logo button-google" onClick={handleClickGoogle}>
            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
          </svg>
          <span className="spanGoogle">Continuar con Google</span>
        </div>

        <span className='span-form'>{error}</span>

        <button disabled={!validateBoolean} className='button-form'>Enviar</button>
      </form>
    </section>
  );
};

export default LoginForm;