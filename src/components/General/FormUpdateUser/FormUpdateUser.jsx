import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clean_error, put_error, sign_in } from '../../../redux/actions';
import { validateInput } from '../../../utils/validateInput';
import { styleError } from '../../../utils/styleError';
import { Client } from '../../../utils/classClient';
import { uriBack } from '../../../utils/const';
import './FormUpdateUser.css';
import Input from '../Input/Input';
import ButtonShown from '../ButtonShown/ButtonShown';
import axios from 'axios';
import Modal from '../Modal/Modal';
import { useNavigate, Link } from 'react-router-dom';

const FormUpdateUser = () => {

    // estados de redux y limpieza de estados

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => dispatch(clean_error());
    }, []);

    const error = useSelector((state) => state.error);

    const user = useSelector((state) => state.user);

    const [newImage, setNewImage] = useState(null);

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
        const getUser = async (mail, password) => {
            try {
                const user = await axios.get(`${uriBack}/user/getUser?mail=${mail}&password=${password}`).then((res) => res.data);
                dispatch(sign_in(user));
            } catch (error) {
                dispatch(put_error(error.response.data.error));
            };
        };
        try {
            if (newImage) {
                const imageForm = { image: newImage, folder: 'Users', name: user.mail };
                const cloudImage = await axios.post(`${uriBack}/image/uploadImage`, imageForm).then((res) => res.data.secure_url);
                const newUser = new Client(input.name, input.lastName, input.mail, input.adress, cloudImage, input.password, user.type, user.id);
                await axios.put(`${uriBack}/user/updateUser`, newUser).then((res) => console.log(res.data));
            } else {
                const newUser = new Client(input.name, input.lastName, input.mail, input.adress, input.image, input.password, user.type, user.id);
                await axios.put(`${uriBack}/user/updateUser`, newUser).then((res) => console.log(res.data));
            }
            setBoolean(true);
            await getUser(input.mail, input.password);
            setInput({ name: "", lastName: "", mail: "", adress: "", image: "", password: "", confirmPassword: "" });
            navigate('/Inicio');
        } catch (error) {
            dispatch(put_error(error.response.data.error));
        };
    };

    const handleChangeImage = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                const img = document.getElementById('img-preview');
                setNewImage(base64Image);
                img.src = base64Image;
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setNewImage(null);
            const img = document.getElementById('img-preview');
            img.src = user.image;
        }
    };

    const closeModal = () => setBoolean(!boolean);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateBoolean) await createUser();
        } catch (error) {
            dispatch(put_error(error));
        }
    };

    return (
        <section className='section-update'>
            <form className='form form-update' onSubmit={handleSubmit}>
                
                <Link to='/Mi-Perfil' className='button-form'>Volver</Link>

                <legend className='legend'>Actualiza tus datos:</legend>

                <ul className='ul-form'>
                    <li className='image-input'>
                        <img className='img-profile' src={user.image} alt='Profile image' id='img-preview' />
                        <input className='input-file' type="file" name="image" id="image" onChange={handleChangeImage}
                            accept='.jpeg, .jpg, .png, .webp' size='2.621.440' // size = 2.5 mb
                        />
                        <label for="image" className='button-form' >Cambiar foto</label>
                    </li>

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