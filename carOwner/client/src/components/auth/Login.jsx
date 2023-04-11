import React, { useContext, useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Navigate, Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import { AuthContext } from '../../contexts/AuthContext'
import { MessageContext } from '../../contexts/MessageContext'

function Login() {
    const { authState: { isAuthenticated, authLoading }, loginUser } = useContext(AuthContext)
    const { messageState: { show, messageType, messageContent }, notifyMessage, closeMessage } = useContext(MessageContext)

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const { username, password } = loginForm

    const handleOnChangeLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const login = async (e) => {
        e.preventDefault()

        const loginData = await loginUser(loginForm)

        if (!loginData.success) {
            notifyMessage("warning", "Đăng nhập không thành công")
        }
    }

    if (isAuthenticated) {
        return (<Navigate replace to='/' />)
    }


    return (
        <>
            <h1 className="text-success mt-5 text-center">HIRING CAR for CAR OWNER</h1>
            <div className="d-flex justify-content-center align-item-center py-5">
                <div className="border rounded shadow py-5 px-4">
                    <h2 className="section-title">
                        Đăng nhập
                    </h2>
                    <Form className='mt-3' onSubmit={login}>
                        <Form.Group className="form-group mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text"
                                name='username'
                                required
                                value={username}
                                onChange={handleOnChangeLoginForm}
                                className='' />
                        </Form.Group>
                        <Form.Group className='form-group mb-3'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text"
                                name='password'
                                required
                                value={password}
                                onChange={handleOnChangeLoginForm}
                                className='' />
                        </Form.Group>
                        {
                            authLoading && (
                                <Button variant='success' className='w-100' required>Loading</Button>
                            )
                        }

                        {
                            !authLoading && (
                                <Button variant='success' className='w-100' type='submit'>Đăng nhập</Button>
                            )
                        }
                    </Form>

                    <p className='text-end mt-3'> Bạn chưa có tài khoản?
                        <Link to='/register'>
                            <Button variant='info'
                                size='sm'
                                className='ms-2'
                                type='submit'>Đăng ký</Button>
                        </Link>
                    </p>
                </div>
            </div>

            <Row>
                <Col xs={6}>
                    <Toast
                        style={{ width: 'fit-content', position: 'fixed', bottom: '10%', left: '20px' }}
                        bg={messageType}
                        onClose={() => closeMessage()}
                        show={show}
                        delay={3000}
                        autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Thông báo</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {messageContent}
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </>

    )
}

export default Login