import { regExp, regExp_mail, regExp_password, regExpDescription, regExpNameProd, regExpPrice } from "./const";

export const validateInput = (input, error) => {
    if (input.name == "" || !regExp.test(input.name)) error.name = "* El nombre solo puede contener letras.";
    else error.name = "";

    if (input.lastName == "" || !regExp.test(input.lastName)) error.lastName = "* El apellido solo debe contener letras.";
    else error.lastName = "";

    if (input.mail == "" || !regExp_mail.test(input.mail)) error.mail = "* El mail no cumple con un formato de mail válido.";
    else error.mail = "";

    if (input.password == "" || !regExp_password.test(input.password)) error.password = "* La contraseña debe contener 1 mayúscula, letras minúsculas, 2 números y un caracter especial.";
    else error.password = "";

    if (input.confirmPassword == "" || !regExp_password.test(input.confirmPassword)) error.confirmPassword = "* La contraseña debe contener 1 mayúscula, letras minúsculas, 2 números y un caracter especial.";
    else error.confirmPassword = "";

    if (input.password != input.confirmPassword) error.passNoMatch = "* Las contraseñas deben coincidir.";
    else error.passNoMatch = "";

    if (input.adress == "") error.adress = "* Por favor ingrese una dirección.";
    else error.adress = "";

    return error;
};

export const validate = (input, error) => {
    const errors = { ...error };

    if (!input.name) errors.name = "*Este campo es obligatorio.";
    else if (!regExpNameProd.test(input.name)) {
        errors.name = `Necesita una nombre de 10 a 50 caracteres. Actual(${input.name.length})`;
    } else errors.name = "";

    if (!input.description) errors.description = "*Este campo es obligatorio.";
    else if (!regExpDescription.test(input.description)) {
        errors.description = `Necesita una descripcion de 10 a 300 caracteres. Actual(${input.name.length})`;
    } else errors.description = "";

    if (!input.type) errors.type = "*Este campo es obligatorio.";
    else errors.type = "";

    if (!input.price) errors.price = "*Este campo es obligatorio.";
    else if (!regExpPrice.test(input.price)) {
        errors.price = "Este campo acepta numeros positivos unicamente.";
    } else errors.price = "";

    if (!input.stock) errors.stock = "*Este campo es obligatorio.";
    else if (!regExpPrice.test(input.stock)) {
        errors.stock = "Este campo acepta numeros positivos unicamente.";
    } else errors.stock = "";

    return errors;
};