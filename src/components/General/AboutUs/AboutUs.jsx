import { useSelector } from "react-redux";
import Input from "../Input/Input";
import { useState } from "react";
import axios from 'axios'
import { uriBack } from "../../../utils/const";
import BtnHome from "../BtnHome/BtnHome";

const AboutUs = () => {
    const user = useSelector((state) => state.user);
    const [input, setInput] = useState({ name: '', mail: '', message: '' });
    const [error, setError] = useState({ name: '', mail: '', message: '' });

    const handleInput = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(validate(input, error));
    }
    const validate = (input, error) => {
        let errors = { ...error };
        if (!input.message)
            errors.message = '*El mensaje del contacto es obligatorio.';
        else if (!/^[^*\/{}[\]]{30,}$/.test(input.message)) {
            errors.message = `Este campo debe contener al menos 30 caracteres.  *Actual: ${input.message.length}`;
        } else errors.message = '';
        if (!input.name)
            errors.name = '*El nombre del contacto es obligatorio.';
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚ ]{3,}$/.test(input.name)) {
            errors.name = `Este campo no debe tener caracteres especiales${input.name.length >= 3 ? ` y debe contener al menos 3 caracteres.  *Actual: ${input.name.length}` : `.`}`;
        } else errors.name = '';
        if (!input.mail)
            errors.mail = '*El E-Mail del contacto es obligatorio.';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.mail)) {
            errors.mail = `Por favor escriba un E-Mail válido.`;
        } else errors.mail = '';

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${uriBack}/mailer/contactUs`, input).then(() => alert(`Mensaje enviado exitosamente.`));
    }

    return (
        <main className="main">
            <BtnHome />
            <h2>Sobre nosotros</h2>
            <div className="contactUs--container">
                <h3>Contacta con Tundra</h3>
                <h5>Come vegan con sabor</h5>
                <Input
                    handleInput={handleInput}
                    errorInput={error.name}
                    id={"name"}
                    label={"Nombre completo:"}
                    name={"name"}
                    type={"text"}
                    value={input.name}
                    key={"name"}
                    button={false}
                />
                <Input
                    handleInput={handleInput}
                    errorInput={error.mail}
                    id={"mail"}
                    label={"E-Mail de contacto:"}
                    name={"mail"}
                    type={"text"}
                    value={input.mail}
                    key={"mail"}
                    button={false}
                />
                <Input
                    handleInput={handleInput}
                    errorInput={error.message}
                    id={"message"}
                    label={"Mensaje del contacto:"}
                    name={"message"}
                    type={"text"}
                    value={input.message}
                    key={"message"}
                    button={false}
                />
                {(!error.mail && !error.name && !error.message) ? <>
                    <button className="btn-submit" onClick={handleSubmit}>Enviar mensaje</button>
                </> : <></>}
            </div>
        </main>
    );

}

export default AboutUs;