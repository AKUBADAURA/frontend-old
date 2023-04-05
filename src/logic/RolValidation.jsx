import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';



const RolValidation = (values) => {
    const { user, dispatch } = useContext(AuthContext);
    let results = []

    if(user.rol){
        values.map((value)=>{
            if (user.rol.indexOf(value) > -1) {
                results.push(1)
            }  
        })    
    }
    if (results.length > 0) {
        return true
    }
    else {
        return false 
    }
}

export default RolValidation


// import React, { useContext } from 'react'
// import { AuthContext } from '../auth/AuthContext';



// const RolValidation = (value) => {
//     const { user, dispatch } = useContext(AuthContext);

//     const filterItems = () => {
//         return user.rol.filter((item) =>
//           item === value
//         );
//     }
    
//     let prueba = filterItems()
//     console.log('filterItems', prueba)

//     if (prueba.legth === 0){
//         return (false)
//     }
//     else {
//         return (true)
//     }
// }

// export default RolValidation
