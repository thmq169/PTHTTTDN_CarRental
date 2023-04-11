import { createContext, useReducer, useCallback } from "react";
import { messageReducer } from "../reducers/messageReducer";
import { NOTIFY_MESSAGE, CLOSE_MESSAGE } from "./constants.js";

export const MessageContext = createContext()

const initState = {
    show: false,
    messageType: '',
    messageContent: ''
}

const MessageContextProvider = ({ children }) => {
    const [messageState, dispatch] = useReducer(messageReducer, initState)

    const notifyMessage = (messageType, messageContent) => {
        dispatch({
            type: NOTIFY_MESSAGE,
            payload: { show: true, messageType, messageContent }
        })
    }

    const closeMessage = () => {
        dispatch({
            type: CLOSE_MESSAGE,
            payload: { show: false }
        })
    }

    // ======================== 
    const messageContextData = {
        messageState, notifyMessage, closeMessage
    }

    return (
        <MessageContext.Provider value={messageContextData}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider