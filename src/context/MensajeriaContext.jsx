import React, { createContext, useState } from 'react'

export const MensajeriaContext = createContext();

export const MensajeriaProvider = ({ children }) => {

    const [messagesHTMLIN, setMessagesHTMLIN] = useState('')
    const [messagesHTMLOUT, setMessagesHTMLOUT] = useState('')

    return (
        <MensajeriaContext.Provider value={{
            messagesHTMLIN, setMessagesHTMLIN,
            messagesHTMLOUT, setMessagesHTMLOUT
        }}>
            {children}
        </MensajeriaContext.Provider>
    )
}

