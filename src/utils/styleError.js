
export const styleError = (error, style) => {
    const errorInput = "errorInput";

    if (error.name != "") style.name = errorInput;
    else style.name = "";

    if (error.lastName != "") style.lastName = errorInput;
    else style.lastName = "";

    if (error.mail != "") style.mail = errorInput;
    else style.mail = "";
    
    if (error.adress != "") style.adress = errorInput;
    else style.adress = "";

    if (error.password != "") style.password = errorInput;
    else error.password = "";

    if (error.confirmPassword != "") style.confirmPassword = errorInput;
    else style.confirmPassword = "";

    return style;
};