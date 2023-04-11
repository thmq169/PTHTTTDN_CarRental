import React, { useContext, useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import { Navigate, Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { MessageContext } from '../../contexts/MessageContext'

function Register() {

    const { authState: { isAuthenticated, authLoading }, registerUser } = useContext(AuthContext)
    const { messageState: { show, messageType, messageContent }, notifyMessage, closeMessage } = useContext(MessageContext)

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        email: "",
        fullname: "",
        phone_number: "",
        address: "",
        CIC_lincense: "",
        CIC_date: ""
    })

    const {
        username,
        password,
        email,
        fullname,
        phone_number,
        address,
        CIC_lincense,
        CIC_date
    } = registerForm

    const handleOnChangeRegisterForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }
    
    const register = async (e) => {
        e.preventDefault()

        const registerData = await registerUser(registerForm)

        if (!registerData.success) {
            notifyMessage("warning", "Đăng ký không thành công")
        }
    }

    if (isAuthenticated) {
        return (<Navigate replace to='/' />)
    }

    return (
        <>
            <h1 className="text-success m-2 text-center">HIRING CAR for CAR OWNER</h1>
            <div className="d-flex justify-content-center align-item-center py-1">
                <div className="border rounded shadow py-2 pt-4 px-4">
                    <h2 className="section-title">
                        Đăng Ký Chủ Xe
                    </h2>
                    <Form className='mt-3' onSubmit={register}>
                        <div className='row'>
                            <div className='col'>
                                <Form.Group className='form-group mt-2'>
                                    <Form.Label>username:</Form.Label>
                                    <Form.Control type="text"
                                        name='username'
                                        value={username}
                                        onChange={handleOnChangeRegisterForm}
                                        required
                                        className='' />
                                </Form.Group>
                            </div>
                            <div className='col'>
                                <Form.Group className='form-group mt-2'>
                                    <Form.Label>password:</Form.Label>
                                    <Form.Control type="password"
                                        name='password'
                                        value={password}
                                        onChange={handleOnChangeRegisterForm}
                                        required
                                        className='' />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="form-group mt-2">
                            <Form.Label>Họ và tên:</Form.Label>
                            <Form.Control type="text"
                                name='fullname'
                                value={fullname}
                                onChange={handleOnChangeRegisterForm}
                                required
                                className='' />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-4'>
                                <Form.Group className="form-group mt-2">
                                    <Form.Label>Số điện thoại:</Form.Label>
                                    <Form.Control type="text"
                                        name='phone_number'
                                        value={phone_number}
                                        onChange={handleOnChangeRegisterForm}
                                        required
                                        className='' />
                                </Form.Group>

                            </div>
                            <div className='col'>
                                <Form.Group className="form-group mt-2">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="text"
                                        name='email'
                                        value={email}
                                        onChange={handleOnChangeRegisterForm}
                                        required
                                        className='' />
                                </Form.Group>
                            </div>

                        </div>


                        <Form.Group className="form-group mt-2">
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control type="text"
                                name='address'
                                value={address}
                                onChange={handleOnChangeRegisterForm}
                                required
                                className='' />
                        </Form.Group>
                        <div className='row'>
                            <div className='col'>
                                <Form.Group className='form-group mt-2'>
                                    <Form.Label>Số căn cước công dân:</Form.Label>
                                    <Form.Control type="text"
                                        name='CIC_lincense'
                                        value={CIC_lincense}
                                        onChange={handleOnChangeRegisterForm}
                                        required
                                        className='' />
                                </Form.Group>
                            </div>
                            <div className='col'>
                                <Form.Group className='form-group mt-2'>
                                    <Form.Label>Ngày cấp:</Form.Label>
                                    <Form.Control type="date"
                                        name='CIC_date'
                                        value={CIC_date}
                                        onChange={handleOnChangeRegisterForm}
                                        required
                                        className='' />
                                </Form.Group>
                            </div>
                        </div>
                        {
                            authLoading && (
                                <Button variant='success' className='w-100 mt-4' required>Loading</Button>
                            )
                        }

                        {
                            !authLoading && (
                                <Button variant='success' className='w-100 mt-4' type='submit'>Đăng ký</Button>
                            )
                        }
                    </Form>
                    <p className='text-end mt-3'> Bạn đã có tài khoản?
                        <Link to='/login'>
                            <Button variant='info'
                                size='sm'
                                className='ms-2'
                                type='submit'>Login</Button>
                        </Link>
                    </p>
                </div >
            </div >


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

export default Register