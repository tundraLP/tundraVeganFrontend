import React from 'react';
import { useState, useEffect } from 'react';
import { validateInput } from '../../../utils/validateInput';
import { styleError } from '../../../utils/styleError';
import { useDispatch, useSelector } from 'react-redux';
import { clean_error, put_error } from '../../../redux/actions';
import { uriBack } from '../../../utils/const';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../../utils/classClient';
import ButtonShown from '../ButtonShown/ButtonShown';
import axios from 'axios';
import FormData from 'form-data';
import Input from '../Input/Input';
import './RegisterForm.css';

const RegisterForm = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(clean_error());
  }, []);

  const navigate = useNavigate();

  const error = useSelector((state) => state.error);

  // estados para los inputs, con sus errores y estilos para modelar los input

  const [image, setImage] = useState(null);

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

  const handleChangeImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const createUser = async (user) => {
    try {
      await axios.post(`${uriBack}/user/createUser`, user).then((res) => res.data);
      setTimeout(() => { navigate('/') }, 1500);
    } catch (error) {
      dispatch(put_error(error.response.data.error));
    };
  };

  const isUser = async () => {
    const response = await axios.get(`${uriBack}/user/isUser?mail=${input.mail}`).then((res) => res.data);
    return response;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const aux = await isUser(input.mail);
      if (!aux){
        if (image){  
          // Seteo el body para subir la imagen
          const imageForm = { image, folder: 'Users', name: input.mail};
          const uploadedImage = await axios.post(`${uriBack}/image/uploadImage`, imageForm).then((res)=>  res.data.secure_url);
          const user = new Client(input.name, input.lastName, input.mail, input.adress, uploadedImage, input.password, 'User', null);
          await createUser(user);
        }else{
          const user = new Client(input.name, input.lastName, input.mail, input.adress, null, input.password, 'User', null);
          await createUser(user);
        }
      }else dispatch(put_error(`Ya existe un usuario con ese mail. Intente otro o inicie sesion.`));
    } catch (error) {
      dispatch(put_error(error.message));
    }
  };
  

  return (

    <section className='section-form'>

      <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
        <legend className='legend'>Ingresa tus datos:</legend>
        <ul className='ul-form'>

          <Input
            errorInput={errorInput.name}
            handleInput={handleInput}
            id={"name"}
            label={"Nombre:"}
            name={"name"}
            style={style.name}
            type={"text"}
            value={input.name}
            key={"name"}
            button={false}
          />

          <Input
            errorInput={errorInput.lastName}
            handleInput={handleInput}
            id={"lastName"} label={"Apellido:"}
            name={"lastName"}
            style={style.lastName}
            type={"text"}
            value={input.lastName}
            key={"lastName"}
            button={false}
          />

          <Input
            errorInput={errorInput.mail}
            handleInput={handleInput}
            id={"mail"}
            label={"Mail:"}
            name={"mail"}
            style={style.mail}
            type={"email"}
            value={input.mail}
            key={"mail"}
            button={false}
          />

          <Input
            errorInput={errorInput.adress}
            handleInput={handleInput}
            id={"adress"}
            label={"Dirección:"}
            name={"adress"}
            style={style.adress}
            type={"text"}
            value={input.adress}
            key={"adress"}
            button={false}
          />

          <Input
            errorInput={errorInput.password}
            handleInput={handleInput}
            id={"password"}
            label={"Contraseña:"}
            name={"password"}
            style={style.password}
            type={shown.password ? "text" : "password"}
            value={input.password}
            key={"password"}
            button={<ButtonShown boolean={shown.password} handleClick={handleClick} input={'password'} />}
          />

          <Input
            errorInput={errorInput.confirmPassword}
            handleInput={handleInput}
            id={"confirmPassword"}
            label={"Repetir contraseña:"}
            name={"confirmPassword"}
            style={style.confirmPassword}
            type={shown.confirmPassword ? "text" : "password"}
            value={input.confirmPassword}
            key={"confirmPassword"}
            button={<ButtonShown boolean={shown.confirmPassword} handleClick={handleClick} input={'confirmPassword'} />}
          />

          <li className='box-input'>
            <label htmlFor="image" className='label-form'>Selecciona una imagen</label>
            <input type="file" name="image" id="image" onChange={handleChangeImage} />
          </li>

        </ul >

        <span className='span-form'>{errorInput.passNoMatch}</span>

        <span className='span-form'>{error}</span>

        <button disabled={!validateBoolean} className='button-form'>Enviar</button>
      </form >

    </section>
  );
};

export default RegisterForm;