const validatePassword = (password, repeatPassword) => {
    if(password !== repeatPassword){
        alert('las contraseñas no coinciden')
        return false
    }
    if (password.length < 8) {
        alert('la longitud de la contraseña debe ser mínimo de 8 caracteres')
    }
    if (password.length >= 8) {
        let mayuscula = false;
        let minuscula = false;
        let numero = false;
        let caracter_raro = false;

        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                mayuscula = true;
            }
            else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                minuscula = true;
            }
            else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                numero = true;
            }
            else {
                caracter_raro = true;
            }
        }
        if (mayuscula === true && minuscula === true && caracter_raro === true && numero === true) {
            return true;
        }
    }
    //setAlertElement({state:true, severity:'warning', message:'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales', time:6000})
    alert('La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales');
    return false;
}

export default validatePassword