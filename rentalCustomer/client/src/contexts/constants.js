export const apiUrl = process.env.NODE_ENV !== 'production'
    ? 'https://car-rental-customer-api.vercel.app/api' : 'somethingdeployURL'

// AuthContext
export const LOCAL_STORAGE_TOKEN_NAME = 'hiring_car'

// CarContext 
export const CAR_LOADED_SUCCESS = 'POST_LOADED_SUCCESS'

export const CAR_LOADED_FAIL = 'POST_LOADED_FAIL'

export const GET_A_CAR = 'GET_A_CAR'

// AccountContext
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'

export const SET_ACCOUNT_LOADING = 'SET_ACCOUNT_LOADING'

export const SET_WISHLIST = 'SET_WISHLIST'
// MessageContext
export const NOTIFY_MESSAGE = 'NOTIFY_MESSAGE'

export const CLOSE_MESSAGE = 'CLOSE_MESSAGE'

export const SUCCESS = "success"

export const WARNING = "warning"

export const DANGER = "danger"


