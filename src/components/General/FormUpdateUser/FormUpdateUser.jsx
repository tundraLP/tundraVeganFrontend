import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clean_error, put_error } from '../../../redux/actions';
import { validateInput } from '../../../utils/validateInput';
import { styleError } from '../../../utils/styleError';
import { Client } from '../../../utils/classClient';
import { uriBack } from '../../../utils/const';
import './FormUpdateUser.css';
import Input from '../Input/Input';
import ButtonShown from '../ButtonShown/ButtonShown';
import axios from 'axios';
import Modal from '../Modal/Modal';

const FormUpdateUser = () => {

    // estados de redux y limpieza de estados

    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch(clean_error());
    }, []);

    const error = useSelector((state) => state.error);

    const user = useSelector((state) => state.user);

    // estados de los inputs

    const [input, setInput] = useState({ name: user.name, lastName: user.lastName, mail: user.mail, adress: user.adress, image: user.image, password: user.password, confirmPassword: "" });

    const [style, setStyle] = useState({ name: "", lastName: "", mail: "", adress: "", image: "", password: "", confirmPassword: "", passNoMatch: "" });

    const [errorInput, setErrorInput] = useState({ name: "", lastName: "", mail: "", adress: "", image: "", password: "", confirmPassword: "", passNoMatch: "" });

    const [shown, setShown] = useState({ password: false, confirmPassword: false });

    const [boolean, setBoolean] = useState(false);

    const validateBoolean = errorInput.name == "" && errorInput.lastName == "" && errorInput.mail == "" && errorInput.password == "" && errorInput.confirmPassword == "" && errorInput.passNoMatch == "" && input.name != "" && input.lastName != "" && input.password != "";

    // manejo de estados

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

    const handleClick = (field) => {
        setShown(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const createUser = async () => {
        try {
            const newUser = new Client(input.name, input.lastName, input.mail, input.adress, input.image, input.password, user.type, user.id);
            await axios.put(`${uriBack}/user/updateUser`, newUser).then((res) => console.log(res));
            setBoolean(true);
            setInput({ name: "", lastName: "", mail: "", adress: "", image: "", password: "", confirmPassword: "" });
        } catch (error) {
            dispatch(put_error(error.response.data.error));
        };
    };

    const closeModal = () => setBoolean(!boolean);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateBoolean) createUser();
    };

    return (
        <section className='section-update'>
            <form className='form form-update' onSubmit={handleSubmit}>
                <legend className='legend'>Actualiza tus datos:</legend>

                <ul className='ul-form'>
                    <Input
                        button={false}
                        errorInput={errorInput.name}
                        handleInput={handleInput}
                        id={"name"}
                        label={"Ingresa tu nombre:"}
                        name={"name"}
                        style={style.name}
                        type={"text"}
                        value={input.name}
                        key={"name"}
                    />

                    <Input
                        button={false}
                        errorInput={errorInput.lastName}
                        handleInput={handleInput}
                        id={"lastName"}
                        label={"Ingresa tu apellido:"}
                        name={"lastName"}
                        style={style.lastName}
                        type={"text"}
                        value={input.lastName}
                        key={"lastName"}
                    />

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
                        button={false}
                        errorInput={errorInput.adress}
                        handleInput={handleInput}
                        id={"adress"}
                        label={"Dirección:"}
                        name={"adress"}
                        style={style.adress}
                        type={"text"}
                        value={input.adress}
                        key={"adress"}
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

                    <Input
                        button={<ButtonShown boolean={shown.confirmPassword} handleClick={handleClick} input={'confirmPassword'} />}
                        errorInput={errorInput.confirmPassword}
                        handleInput={handleInput}
                        id={"confirmPassword"}
                        label={"Repetir contraseña:"}
                        name={"confirmPassword"}
                        style={style.confirmPassword}
                        type={shown.confirmPassword ? "text" : "password"}
                        value={input.confirmPassword}
                        key={"confirmPassword"}
                    />
                </ul>

                <span className='span-form'>{errorInput.passNoMatch}</span>

                <button disabled={!validateBoolean} className='button-form'>Actualizar</button>

                <span className='span-form'>{error}</span>
            </form>

            {boolean && <Modal closeModal={closeModal} message={"Usuario actualizado correctamente"} />}
        </section>
    );
};

export default FormUpdateUser;