export const uriBack = 'http://localhost:8001';
export const regExp = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
export const regExp_password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
export const regExp_mail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
export const regExpDescription = /^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,300}$/;
export const regExpPrice = /^\d+$/;
export const regExpNameProd = /^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,50}$/;

export const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];