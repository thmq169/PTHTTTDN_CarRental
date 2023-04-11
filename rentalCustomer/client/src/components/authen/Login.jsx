import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './authen.css'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { MessageContext } from "../../contexts/MessageContext";

function Login() {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const { username, password } = loginForm

    const handleOnchangeLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const { authState, loginUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const { notifyMessage } = useContext(MessageContext)

    const login = async (e) => {
        e.preventDefault()

        try {
            const loginData = await loginUser(loginForm)

            if (loginData.success) {
                if (authState.currentPage) {
                    navigate(authState.currentPage)
                } else {
                    navigate('/')
                }
            } else {
                notifyMessage('warning', 'Đăng nhập không thành công')

                // setAlert({ type: 'danger', content: loginData.message })
                // setTimeout(() => {
                //     setAlert(null)
                // }, 2000)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-page d-flex align-items-center justify-content-center  ">
            <div className="overlay p-4 border rounded">
                <h2 className='text-light text-center'>Login</h2>
                <Form className='mb-3' onSubmit={login}>
                    <Form.Group>
                        <Form.Control type="text"
                            placeholder='Username'
                            name='username'
                            required
                            className='mt-2'
                            value={username}
                            onChange={handleOnchangeLoginForm} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="password"
                            placeholder='Password'
                            autoComplete="on"
                            name='password'
                            required
                            className='mt-3 mb-3'
                            value={password}
                            onChange={handleOnchangeLoginForm} />
                    </Form.Group>

                    <div className="d-flex flex-column justify-content-end">
                        {
                            authState.authLoading && (
                                <Button variant='success' disabled className='mb-3 align-self-end'>Loading</Button>
                            )
                        }

                        {
                            !authState.authLoading && (
                                <Button variant='success' type='submit' className='mb-3 align-self-end'>Login</Button>
                            )
                        }

                        <p className='text-light text-end'> Don't have an account?
                            <Link to='/register'>
                                <Button variant='info'
                                    size='sm'
                                    className='ms-2'
                                    type='submit'>Register</Button>
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login