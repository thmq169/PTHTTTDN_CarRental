import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './authen.css'

function Register() {
    return (
        <div className="register-page d-flex align-items-center justify-content-center  ">
            <div className="p-4 border rounded overlay w-75">
                <h2 className='text-light text-center'>Register</h2>
                <Form className='mb-3'>
                    <div className="row">
                        <div className="col col-lg-4 col-md-12 col-sm-12 text-light">
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"
                                    placeholder='Username'
                                    name='username'
                                    required
                                    className='mt-2 mb-3' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    placeholder='Password'
                                    autoComplete="on"
                                    name='password'
                                    required
                                    className=' mb-3' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"
                                    placeholder='Confirm Password'
                                    autoComplete="on"
                                    name='password'
                                    required
                                    className=' mb-3' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text"
                                    placeholder='0987654321'
                                    autoComplete="on"
                                    name='phone'
                                    required
                                    className=' mb-3' />
                            </Form.Group>

                        </div>
                        <div className="col col-lg-8 col-md-12 col-sm-12 text-light">
                            <Form.Group>
                                <Form.Label>Your Address</Form.Label>
                                <Form.Control type="text"
                                    placeholder='Address'
                                    autoComplete="on"
                                    name='address'
                                    required
                                    className='mt-2 mb-3' />
                            </Form.Group>
                            <Form.Label>Your Identity Card</Form.Label>
                            <Form.Group className="register-identity">
                                <Form.Control type="text"
                                    placeholder='Your Citizen ID'
                                    name='id-citizen'
                                    required
                                    className='mb-3 me-2' />
                                <Form.Control type="date"
                                    name='date-id-citizen'
                                    required
                                    className='mb-3 me-3' />
                                <Form.Control type="text"
                                    placeholder='Place of issue of identity card'
                                    name='citizen-issue'
                                    required
                                    className='me-2 mb-3' />
                            </Form.Group>
                            <Form.Label>Your Driver License ID</Form.Label>
                            <Form.Group className="register-identity">
                                <Form.Control type="text"
                                    placeholder='Your Driver License ID'
                                    name='id-driver'
                                    required
                                    className='me-2 mb-3' />
                                <Form.Control type="date"
                                    name='date-id-driver'
                                    required
                                    className='mb-3 me-3' />
                                <Form.Control type="text"
                                    placeholder='Place of issue of identity driver'
                                    name='driver-issue'
                                    required
                                    className='me-2 mb-3' />
                            </Form.Group>
                            <Form.Label>Place of Residence</Form.Label>
                            <Form.Group className="register-identity">
                                <Form.Control type="text"
                                    placeholder='Your Place'
                                    name='place-residence'
                                    required
                                    className=' mb-3' />

                            </Form.Group>

                            <div className="d-flex flex-column justify-content-end">
                                <Button variant='success' type='submit' className='mb-3 align-self-end'>Register</Button>
                                <p className='text-light text-end'> Already account
                                    <Link to='/login'>
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