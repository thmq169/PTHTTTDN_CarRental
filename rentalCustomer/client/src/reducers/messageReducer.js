import { NOTIFY_MESSAGE, CLOSE_MESSAGE } from "../contexts/constants"

const messageReducer = (state, action) => {
    const { type, payload: { show, messageType, messageContent } } = action

    switch (type) {
        case NOTIFY_MESSAGE:
            return {
                ...state,
                show,
                messageType,
                messageContent
            }

        case CLOSE_MESSAGE:
            return {
                ...state,
                show,
                messageType: '',
                messageContent: ''
            }

        default:
            return state
    }
}

export { messageReducer }