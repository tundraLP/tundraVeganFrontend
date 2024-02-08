import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchTypes } from '../../../hooks/useFetchTypes';
import { uriBack } from '../../../utils/const';
import { put_error } from '../../../redux/actions';
import { Product } from '../../../utils/classProduct';

const CreateProductAdmin = () => {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const navigate = useNavigate();

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
    const validate = (input, error)=>{
        const errors= {...error};

        if (!input.name) errors.name= '*Este campo es obligatorio.';
        else if (!/^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,50}$/.test(input.name)){
            errors.name= `Necesita una nombre de 10 a 50 caracteres. Actual(${input.name.length})`;
        }else errors.name= '';

        if (!input.description) errors.description= '*Este campo es obligatorio.';
        else if (!/^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,300}$/.test(input.description)){
            errors.description= `Necesita una descripcion de 10 a 300 caracteres. Actual(${input.name.length})`;
        }else errors.description= '';

        if (!input.type) errors.type= '*Este campo es obligatorio.';
        else errors.type= '';

        if (!input.price) errors.price = '*Este campo es obligatorio.'
        else if (!/^\d+$/.test(input.price)){
            errors.price= 'Este campo acepta numeros positivos unicamente.';
        }else errors.price= '';

        /*if (!input.image) errors.image = '*La imagen es obligatoria.'
        else errors.image = '';*/

        if (!input.stock) errors.stock = '*Este campo es obligatorio.'
        else if (!/^\d+$/.test(input.stock)){
            errors.stock= 'Este campo acepta numeros positivos unicamente.';
        }else errors.stock= '';

        return errors;
    }


    // Fin del validate 

    const handleChange = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(validate({...input, [e.target.name]: e.target.value,}, error));
    }

    const handleChangeImage = (e) => {
        e.preventDefault();
        const selectedImage = e.target.files[0];
        if (selectedImage) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Image = e.target.result;
            setInput({...input, image: base64Image});
          };
          reader.readAsDataURL(selectedImage);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageForm = { image: input.image, folder: input.type, name: input.name};
            const imageUrl = await axios.post(`${uriBack}/image/uploadImage`, imageForm).then((res) => {
                return res.data.secure_url});
            const product= new Product(input.name, input.type, input.description, input.price, input.stock, imageUrl, null);
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
        setError(validate({...input, type: e.target.value,}, error));

    }

    useEffect(()=> {
        if (!types.length > 0) useFetchTypes();
    }, [types]);
    
    return (
        <section className='section-create-product'>
            <h2>Crear Producto Admin</h2>
            <form className='form--create-product' onSubmit={handleSubmit}>
                <div className="div--form">
                    <label htmlFor="name" className="label">Nombre: </label>
                    <input className="input" type="text" name='name' onChange={handleChange} value={input.value}/>
                    <span className="span--form">{error.name}</span>
                </div>

                <div className="div--form">
                    <label htmlFor="description" className="label">Descripcion: </label>
                    <input className="input" type="text" name='description' onChange={handleChange} value={input.value}/>
                    <span className="span--form">{error.description}</span>
                </div>

                <div className="div--form">
                    <label htmlFor="price" className="label">Precio por unidad: </label>
                    <input className="input" type="text" name='price' onChange={handleChange} value={input.value}/>
                    <span className="span--form">{error.price}</span>
                </div>

                <div className="div--form">
                    <label htmlFor="stock" className="label">Unidades en stock: </label>
                    <input className="input" type="text" name='stock' onChange={handleChange} value={input.value}/>
                    <span className="span--form">{error.stock}</span>
                </div>

                <div>
                    <label htmlFor='type' className='label'>Categoria: </label>
                    <select onChange={handleTypeChange}>
                        <option  defaultValue=''>Seleccionar una categoria</option>
                        {types.map((type)=> <option key={type.name} value={type.name}>{type.name}</option>)}
                    </select>
                    <span className='span--form'>{error.type}</span>
                </div>

                <div>
                    <label htmlFor="image" className='label'>Imagen del producto: </label>
                    <input className='input-file' type="file" name='image' onChange={handleChangeImage}
                         accept='.jpeg, .jpg, .png, .webp' size='2.621.440' // size = 2.5 mb
                    /> 
                    <span className='span--form'>{error.image}</span>
                </div>
                {error.name || error.description || error.image || error.type || error.price || error.stock ? 
                <div>
                    <h3>Errors founded.</h3>
                </div> : 
                <>
                    <button  type="submit" className="btn--form" >Crear producto</button>
                </>}
            </form>
        </section>
    );
}

export default CreateProductAdmin;