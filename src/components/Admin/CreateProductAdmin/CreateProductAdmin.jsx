import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchTypes } from '../../../hooks/useFetchTypes';
import { uriBack } from '../../../utils/const';
import { Product } from '../../../utils/classProduct';
import { validate } from '../../../utils/validateInput';
import Modal from '../../General/Modal/Modal';
import Input from '../../General/Input/Input';
import './CreateProductAdmin.css';
import FormCreateType from '../FormCreateType/FormCreateType';

const CreateProductAdmin = () => {
    const types = useSelector((state) => state.types);

    const defaultImage = 'https://res.cloudinary.com/tundra/image/upload/v1704899440/samples/food/spices.jpg';

    const inputBase = {
        name: '',
        description: '',
        image: null,
        type: '',
        price: '',
        stock: '',
    };

    const [boolean, setBoolean] = useState(false);
    const [message, setMessage] = useState('');

    const [input, setInput] = useState(inputBase);
    const [error, setError] = useState(inputBase);

    const errorInput = error.name || error.description || error.image || error.type || error.price || error.stock;

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(validate({ ...input, [e.target.name]: e.target.value, }, error));
    }

    const handleChangeImage = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                const img = document.getElementById('img-preview');
                img.src = base64Image;
                setInput({ ...input, image: base64Image });
                setError(validate({ ...input, image: base64Image }, error));
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setInput({ ...input, image: defaultImage });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errorInput) {
            try {
                const imageForm = { image: input.image, folder: input.type, name: input.name };
                const imageUrl = await axios.post(`${uriBack}/image/uploadImage`, imageForm).then((res) => {
                    return res.data.secure_url
                });
                const product = new Product(input.name, input.type, input.description, input.price, input.stock, imageUrl, null);
                await axios.post(`${uriBack}/product/createProduct`, product).then((res) => res.data);
                setMessage('Producto creado de manera exitosa.');
                setBoolean(!boolean);
            } catch (error) {
                setMessage(error);
                setBoolean(!boolean);
            }
        }
    }

    const handleTypeChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            type: e.target.value,
        });
        setError(validate({ ...input, type: e.target.value, }, error));
    }

    useEffect(() => {
        if (!types.length > 0) useFetchTypes();
    }, [types]);

    const closeModal = () => closeModal(!boolean);

    return (
        <section className='section-create-product'>
            <h2>Crear Producto Admin</h2>

            <div className='div-create-product'>

                <form className='form' onSubmit={handleSubmit}>

                    <ul className='ul-form'>

                        <li className='image-input'>
                            <span className='p'>Imagen del producto</span>
                            <img className='img' src={defaultImage} alt='Profile image' id='img-preview' />
                            <input className='input-file' type="file" name="image" id="image" onChange={handleChangeImage}
                                accept='.jpeg, .jpg, .png, .webp' size='2.621.440' // size = 2.5 mb
                            />
                            <label htmlFor="image" className='button-form' >Cambiar foto</label>
                            <label htmlFor="image" className='labels'>{error.image}</label>
                            {
                                error.image && <label htmlFor='image' className='labels'>Ésta es una imagen de muestra</label>
                            }
                        </li>

                        <Input
                            button={false}
                            errorInput={error.name}
                            handleInput={handleChange}
                            id={'name'}
                            label={'Nombre:'}
                            name={'name'}
                            style={''}
                            type={'text'}
                            value={input.name}
                            key={'name'}
                        />

                        <Input
                            button={false}
                            errorInput={error.description}
                            handleInput={handleChange}
                            id={'description'}
                            label={'Descripcion:'}
                            name={'description'}
                            style={''}
                            type={'text'}
                            value={input.description}
                        />

                        <Input
                            button={false}
                            errorInput={error.price}
                            handleInput={handleChange}
                            id={'price'}
                            label={'Precio por unidad:'}
                            name={'price'}
                            style={''}
                            type={'text'}
                            value={input.price}
                            key={'price'}
                        />

                        <Input
                            button={false}
                            errorInput={error.stock}
                            handleInput={handleChange}
                            id={'stock'}
                            label={'Unidades en stock:'}
                            name={'stock'}
                            style={''}
                            type={'text'}
                            value={input.stock}
                            key={'stock'}
                        />

                        <div>
                            <label htmlFor='type' className='label-form'>Categoria: </label>
                            <select onChange={handleTypeChange} className='select-product'>
                                <option defaultValue=''>Seleccionar una categoria</option>
                                {types.map((type) => <option key={type.name} value={type.name}>{type.name}</option>)}
                            </select>
                            <span className='span--form'>{error.type}</span>
                        </div>

                        {
                            errorInput ?
                                <span className='span-error'>Se econtraron errores</span> :
                                <button type="submit" className="button-form" >Crear producto</button>
                        }

                    </ul>
                </form>

                {boolean && <Modal closeModal={closeModal} message={message} key={'message'} />}

                <FormCreateType key={'type'} />

            </div>
        </section>
    );
}

export default CreateProductAdmin;