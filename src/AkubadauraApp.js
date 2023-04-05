import React, { useReducer, useEffect } from 'react'
import { AppRouter } from './routers/AppRouter'

import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { POAProvider } from './context/POAContext'
import { IndexProvider } from './context/IndexContext'

const init = () => {
    if(localStorage.getItem('JWT')){
        const JWT = localStorage.getItem('JWT')
        const parseJWT = parseJwt(JWT)
        //const expiryDate = new Date(parseJWT.exp*1000);
        const unixDateJWT = parseJWT.exp
        const unixDateNow = Math.round((Date.now())/1000)
        if(unixDateJWT<unixDateNow){
            console.log('unixDateNow:', unixDateNow, 'unixDateJWT', unixDateJWT, 'expirado')
            localStorage.removeItem('JWT')
            localStorage.removeItem('user')
            alert('Su sesión expiró, por favor vuelva a iniciar sesión')
        }

    }
    return JSON.parse(localStorage.getItem('user')) || { logged: false, rol:[0] };
}


const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};


export const AkubadauraApp = () => {
    
    const [ user, dispatch ] = useReducer(authReducer, {}, init);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // State variables 

 
    
    


    


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        localStorage.setItem( 'user', JSON.stringify(user) );
        console.log('modificacion de usuario general')
        console.log('user: ', user)
    }, [user])
    useEffect(() => {
    }, [])

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <IndexProvider>
                <POAProvider>
                    <AppRouter />
                </POAProvider>
            </IndexProvider>
        </AuthContext.Provider>     
    )
}
