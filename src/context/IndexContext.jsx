import React, { createContext, useEffect, useState } from 'react'

export const IndexContext = createContext();



export const IndexProvider = ({children}) => {
    
    const [openModalIndex, setOpenModalIndex] = useState(false)
    useEffect(() => {
        setOpenModalIndex(true)
    }, [])

    return (
        <IndexContext.Provider value={{
            openModalIndex, setOpenModalIndex
        }}>
            {children}            
        </IndexContext.Provider>
    )
}

