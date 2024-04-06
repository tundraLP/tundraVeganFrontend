import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchTypes } from '../../../hooks/useFetchTypes';
import { uriBack } from '../../../utils/const';
import { put_error } from '../../../redux/actions';
import { Product } from '../../../utils/classProduct';
import Input from '../../General/Input/Input';
import './CreateProductAdmin.css';

const CreateProductAdmin = () => {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const navigate = useNavigate();

    const defaultImage = 'https://res.cloudinary.com/tundra/image/upload/v1704899440/samples/food/spices.jpg';

    const inputBase = {
        name: '',
        description: '',
        image: null,
        type: '',
        price: '',
        stock: '',
    };

    const [input, setInput] = useState(inputBase);
    const [error, setError] = useState(inputBase);


    // Validate     
    const validate = (input, error) => {
        const errors = { ...error };

        if (!input.name) errors.name = '*Este campo es obligatorio.';
        else if (!/^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,50}$/.test(input.name)) {
            errors.name = `Necesita una nombre de 10 a 50 caracteres. Actual(${input.name.length})`;
        } else errors.name = '';

        if (!input.description) errors.description = '*Este campo es obligatorio.';
        else if (!/^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,300}$/.test(input.description)) {
            errors.description = `Necesita una descripcion de 10 a 300 caracteres. Actual(${input.name.length})`;
        } else errors.description = '';

        if (!input.type) errors.type = '*Este campo es obligatorio.';
        else errors.type = '';

        if (!input.price) errors.price = '*Este campo es obligatorio.'
        else if (!/^\d+$/.test(input.price)) {
            errors.price = 'Este campo acepta numeros positivos unicamente.';
        } else errors.price = '';

        /*if (!input.image) errors.image = '*La imagen es obligatoria.'
        else errors.image = '';*/

        if (!input.stock) errors.stock = '*Este campo es obligatorio.'
        else if (!/^\d+$/.test(input.stock)) {
            errors.stock = 'Este campo acepta numeros positivos unicamente.';
        } else errors.stock = '';

        return errors;
    }


    // Fin del validate 

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
            setInput({ ...input, image: base64Image });
            img.src = base64Image;
          };
          reader.readAsDataURL(selectedImage);
        }else{
            setInput({ ...input, image: null });
            const img = document.getElementById('img-preview');
            img.src = defaultImage;
        } 
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageForm = { image: input.image, folder: input.type, name: input.name };
            const imageUrl = await axios.post(`${uriBack}/image/uploadImage`, imageForm).then((res) => {
                return res.data.secure_url
            });
            const product = new Product(input.name, input.type, input.description, input.price, input.stock, imageUrl, null);
            await axios.post(`${uriBack}/product/createProduct`, product).then((res) => navigate('/Inicio'));
        } catch (error) {
            dispatch(put_error(error));
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

    return (
        <section className='section-create-product'>
            <h2>Crear Producto Admin</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='image-input'>
                            <h4>Imagen del producto</h4>
                            <img className='image-preview' src={defaultImage} alt='Profile image' id='img-preview' />
                            <input className='input-file' type="file" name="image" id="image" onChange={handleChangeImage} 
                                accept='.jpeg, .jpg, .png, .webp' size='2.621.440' // size = 2.5 mb
                            />
                                <label for="image" className='button-form' >Cambiar foto</label>
                </div>

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
                    error.name || error.description || error.image || error.type || error.price || error.stock ?
                        <h3>Errors founded.</h3> :
                        <button type="submit" className="button-form" >Crear producto</button>
                }
            </form>
        </section>
    );
}

export default CreateProductAdmin;