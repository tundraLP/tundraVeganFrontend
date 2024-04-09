import React, { useState } from 'react';
import { regExpNameProd, uriBack } from '../../../utils/const';
import './FormCreateType.css';
import Input from '../../General/Input/Input';
import Modal from '../../General/Modal/Modal';
import axios from 'axios';

const FormCreateType = () => {

  const [boolean, setBoolean] = useState(false);
  const [message, setMessage] = useState('');

  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [styleError, setStyleError] = useState('');

  const validateInput = (input) => {
    if (input == "") setError('* Este campo no puede quedar vacio.');
    else if (regExpNameProd.test(input)) setError('* Solo se admiten letras para este campo.');
    else setError('');
  };

  const validateStyle = (error) => {
    if (error) setStyleError('errorInput');
    else setStyleError('');
  };

  const handleInput = (e) => {
    setInput(e.target.value);

    validateInput(e.target.value);

    validateStyle(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const type = {
      type: input
    };

    if (!error) {
      try {
        await axios.post(`${uriBack}/type/createType`, type).then((res) => res.data);
        setMessage('El tipo se ha creado de manera exitosa.');
        setBoolean(!boolean);
      } catch (error) {
        setMessage('No se ha podido crear el tipo.');
        setBoolean(!boolean);
      }
    }
  }

  const closeModal = () => setBoolean(!boolean);

  return (
    <form className='form-prod' onSubmit={handleSubmit}>
      <legend className='legend'>Crea un tipo de comida:</legend>
      
      <Input
        button={false}
        errorInput={error}
        handleInput={handleInput}
        id={'type'}
        label={'Nombre del tipo de producto:'}
        name={'type'}
        style={styleError}
        type={'text'}
        value={input}
        key={'input'}
      />

      {
        error ?
          <span className='span-form'>Hay un error</span>
          :
          <button className='button-form' type='submit'>Crear</button>
      }

      {boolean && <Modal closeModal={closeModal} message={message} key={'message'} />}
    </form>
  )
};

export default FormCreateType;