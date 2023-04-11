import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../contexts/AuthContext'
import { MessageContext } from '../../contexts/MessageContext'
import './authen.css'

import { useNavigate } from 'react-router-dom'

function Register() {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        email: "",
        fullname: "",
        phone_number: "",
        address: "",
        CIC_lincense: "",
        CIC_date: "",
        drive_lincense_type: "Driver license",
        drive_lincense: "",
        drive_lincense_date: ""
    })

    const { authState, registerUser } = useContext(AuthContext)
    const { notifyMessage } = useContext(MessageContext)

    const navigator = useNavigate()

    const { username,
        password,
        email,
        fullname,
        phone_number,
        address,
        CIC_lincense,
        CIC_date,
        drive_lincense,
        drive_lincense_date } = registerForm

    const handleOnchangeRegisterForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const onSubmitRegisterForm = async (e) => {
        e.preventDefault()

        const registerData = await registerUser(registerForm)

        if (registerData) {
            navigator('/')
        } else {
            notifyMessage('warning', 'Đăng ký không thành công')
        }
    }

    return (
        <div className="register-page d-flex align-items-center justify-content-center  ">
            <div className="p-4 border rounded overlay w-75">
                <h2 className='text-light text-center'>Register</h2>
                <Form className='mb-3' onSubmit={onSubmitRegisterForm}>
                    <div className="row">
                        <div className="col col-lg-4 col-md-12 col-sm-12 text-light">
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"
                                    placeholder='username'
                                    name='username'
                                    value={username}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className='mt-2 mb-3' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    placeholder='password'
                                    autoComplete="on"
                                    name='password'
                                    value={password}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className=' mb-3' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fullname</Form.Label>
                                <Form.Control type="text"
                                    placeholder='fullname'
                                    name='fullname'
                                    value={fullname}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className='mt-2 mb-3' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text"
                                    placeholder='email'
                                    autoComplete="on"
                                    name='email'
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className=' mb-3' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text"
                                    placeholder='0987654321'
                                    autoComplete="on"
                                    name='phone_number'
                                    value={phone_number}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className=' mb-3' />
                            </Form.Group>

                        </div>
                        <div className="col col-lg-8 col-md-12 col-sm-12 text-light">
                            <Form.Group>
                                <Form.Label>Your Address</Form.Label>
                                <Form.Control type="text"
                                    placeholder='address'
                                    autoComplete="on"
                                    name='address'
                                    value={address}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className='mt-2 mb-3' />
                            </Form.Group>
                            <Form.Label>Your Identity Card</Form.Label>
                            <Form.Group className="register-identity">
                                <Form.Control type="text"
                                    placeholder='Your Citizen ID'
                                    name='CIC_lincense'
                                    value={CIC_lincense}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className='mb-3 me-2' />
                                <Form.Control type="date"
                                    name='CIC_date'
                                    value={CIC_date}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className='mb-3 me-3' />
                            </Form.Group>
                            <Form.Label>Your Driver License ID</Form.Label>
                            <Form.Group className="register-identity">
                                <Form.Control type="text"
                                    placeholder='Your Driver License ID'
                                    name='drive_lincense'
                                    value={drive_lincense}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className='me-2 mb-3' />
                                <Form.Control type="date"
                                    name='drive_lincense_date'
                                    value={drive_lincense_date}
                                    onChange={handleOnchangeRegisterForm}
                                    required
                                    className='mb-3 me-3' />
                            </Form.Group>
                            <div className="d-flex flex-column justify-content-end">
                                {
                                    !authState.authLoading && (
                                        <Button variant='success' type='submit' className='mb-3 align-self-end'>Register</Button>
                                    )
                                }
                                {
                                    authState.authLoading && (
                                        <Button variant='success' disabled className='mb-3 align-self-end'>Loading</Button>
                                    )
                                }


                                <p className='text-light text-end'> Already account
                                    <Link to='/login' disabled>
                                        <Button variant='info'
                                            size='sm'
                                            className='ms-2'>Login</Button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Form>

            </div>
        </div>
    )
}

export default Register