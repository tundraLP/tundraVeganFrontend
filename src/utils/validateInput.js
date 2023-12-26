import { regExp, regExp_mail, regExp_password } from "./const";

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