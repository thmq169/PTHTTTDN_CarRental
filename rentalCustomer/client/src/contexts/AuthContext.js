import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";


export const AuthContext = createContext()

const initState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    documents: [],
    currentPage: null
}

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initState)

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user, documents: response.data.documents, currentPage: authState.currentPage }
                })
            }
            else {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
                setAuthToken(null)
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: false, user: null, documents: [], currentPage: null }
                })

            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null, documents: null, currentPage: null }
            })
        }
    }

    const isUserLogin = async () => {
        await loadUser()

        if (authState.isAuthenticated) {
            return true
        } else {
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null, documents: null, currentPage: window.location.href.replace('http://localhost:3001', '') }
            })

            return false
        }
    }

    // login 
    const loginUser = async (userForm) => {
        dispatch({
            type: 'SET_AUTH_LOADING',
            payload: { isAuthenticated: false, user: null, documents: [], currentPage: null }
        })

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)

            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }


            await loadUser()

            return response.data
        } catch (error) {
            await loadUser()

            if (error.response.data)
                return error.response.data
            else
                return { success: false, message: error.message }
        }
    }

    // Register
    const registerUser = async (userForm) => {
        dispatch({
            type: 'SET_AUTH_LOADING',
            payload: { isAuthenticated: false, user: null, documents: [], currentPage: null }
        })

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)

            console.log(response)

            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                await loadUser()
                return true
            } else{
                await loadUser()
                return false
            }


        } catch (error) {
            await loadUser()
            console.log(error)
            return false
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null);
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null }
        })
    }

    const authContextData = { authState, loadUser, loginUser, logoutUser, registerUser, isUserLogin }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider