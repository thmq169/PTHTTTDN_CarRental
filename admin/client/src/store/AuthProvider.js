import { useReducer, useEffect } from 'react'
import axios from 'axios'
import Context from './Context'
import authReducer, {initState} from './reducers/authReducer'
import setAuthToken from '../utils/setAuthToken'
import { LOCAL_STORAGE_TOKEN_NAME, URL_BACKEND } from './actions/constants'
import {actions} from './index'

function AuthProvider({children}) {

    const [authState,authDispatch] = useReducer(authReducer,initState)

    const loadUser = async () => {
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
          setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
      }

      try {
          const response = await axios.get(`${URL_BACKEND}/api/staff/auth`)
          if (response.data.success) {
            authDispatch(actions.setAuth(true))
            authDispatch(actions.setUser(response.data.role))
          }
          else {
              localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
              setAuthToken(null)
              authDispatch(actions.setAuth(false))
              authDispatch(actions.setUser(null))
          }
      } catch (error) {
          console.log(error)
          localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
          setAuthToken(null)
          authDispatch(actions.setAuth(false))
          authDispatch(actions.setUser(null))
      }
    }


    // login 
    async function loginUser(userForm){
      try {
          const response = await axios.post(`${URL_BACKEND}/api/staff/auth/login`, userForm)
          if (response.data.success) {
              localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
          }

          await loadUser()

          return response.data
      } catch (error) {
          if (error.response.data)
              return error.response.data
          else
              return { success: false, message: error.message }
      }
    }

    // Register
    const registerUser = async (userForm) => {
      try {
          const response = await axios.post(`${URL}/api/staff/auth/register`, userForm)
          if (response.data.success) {
              localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
          }
          await loadUser()
      } catch (error) {
          // lỗi có chủ đích được lấy từ api của ta
          if (error.response.data) {
              return error.response.data
          } else {
              return { success: false, message: error.message }
          }
      }
    }

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        localStorage.removeItem('role')
        setAuthToken(null);
        authDispatch(actions.setAuth(false))
        authDispatch(actions.setUser(null))
    }

    return (
        <Context.Provider value={[authState,authDispatch]}>
          {children}
        </Context.Provider>
    )
}

export default AuthProvider