import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LOCAL_STORAGE_TOKEN_NAME, URL_BACKEND } from '../../store/actions/constants'
import { actions, useAuth } from '../../store'
import setAuthToken from '../../utils/setAuthToken'
import AlertMessage from '../alert/AlertMessage'
import './authen.css'

function Login() {

    const navigate = useNavigate()

    let roleLocal = localStorage.getItem('role')

    useEffect(() => {
        if (roleLocal) {
            navigate("/")
        }
    }, [])



    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const [role, setRole] = useState("")
    const [authState, authDispatch] = useAuth()
    const [alert, setAlert] = useState(null)

    const handleSetLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const loadUser = async (id) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${URL_BACKEND}/api/staff/auth/` + id)
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

    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${URL_BACKEND}/api/staff/auth/login`, userForm)
            if (response.data.sucess) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }

            // await loadUser(response.data.staff.id)

            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else
                return { success: false, message: error.message }
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const loginData = await loginUser(loginForm)

        if (loginData.success) {

            setRole(loginData.role)

            console.log(loginData);
            localStorage.setItem('role', loginData.role)
            localStorage.setItem('idStaff', loginData.staff._id)
            localStorage.setItem('fullnameStaff', loginData.staff.fullname)
            setAlert({ type: 'success', content: loginData.message })

            setAlert(null)
            navigate('/')

        }
        else {
            setAlert({ type: 'danger', content: loginData.message })
            setTimeout(() => {
                setAlert(null)
            }, 4000)
            setLoginForm({
                username: '',
                password: '',
            })
        }

    }

    // useEffect(() => {
    //     console.log(loginForm.username)
    // }, [loginForm])


    return (
        <div className="login-page d-flex align-items-center justify-content-center  ">
            <div className="overlay p-4 border rounded">
                <h2 className='text-light text-center'>Login</h2>

                <Form className='mb-3' onSubmit={handleSubmit}>
                    <AlertMessage message={alert} />
                    <Form.Group>
                        <Form.Control
                            onChange={handleSetLoginForm}
                            type="text"
                            placeholder='Username'
                            name='username'
                            required
                            className='mt-2' />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            onChange={handleSetLoginForm}
                            type="password"
                            placeholder='Password'
                            autoComplete="on"
                            name='password'
                            required
                            className='mt-3 mb-3' />
                    </Form.Group>

                    <div className="d-flex flex-column justify-content-end">
                        <Button variant='success' type='submit' className='mb-3 align-self-end'>Login</Button>
                        {/* <p className='text-light text-end'> Don't have an account?
                            <Link to='/register'>
                                <Button variant='info'
                                    size='sm'
                                    className='ms-2'>Register</Button>
                            </Link>
                        </p> */}
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login