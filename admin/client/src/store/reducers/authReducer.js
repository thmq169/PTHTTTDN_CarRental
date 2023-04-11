import { SET_AUTH, SET_USER } from '../actions/constants'

const initState = {
    isAuthenticated: false,
    user: null
}

function authReducer(state,action) {
    switch(action.type) {
        case SET_AUTH:
            return{
                ...state,
                isAuthenticated: action.payload,
            }
        case SET_USER:
            return{
                ...state,
                user: action.payload,
            }
        default:
            return state
    }
}

export {initState}
export default authReducer