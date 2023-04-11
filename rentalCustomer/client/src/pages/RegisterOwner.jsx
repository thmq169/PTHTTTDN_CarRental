import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function RegisterOwner() {
    return (
        <div className="d-flex justify-content-center align-item-center py-5">
            <div className="border rounded shadow py-5 px-4">
                <h2 className="section-title">
                    Đăng Ký Chủ Xe
                </h2>
                <Form className='mt-3'>
                    <Form.Group className="form-group">
                        <Form.Label>CCCD/CMND:</Form.Label>
                        <Form.Control type="text"
                            name='id-card'
                            required
                            className='' />
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Giấy phép lái xe:</Form.Label>
                        <Form.Control type="text"
                            name='driver-license-card'
                            required
                            className='' />
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Tên xe:</Form.Label>
                        <Form.Control type="text"
                            name='name-car'
                            required
                            className='' />
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Số xe:</Form.Label>
                        <Form.Control type="text"
                            name='flat-car'
                            required
                            className='' />
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Giấy tờ đăng ký xe:</Form.Label>
                        <Form.Control type="text"
                            name='registration-car'
                            required
                            className='' />
                    </Form.Group>

                    <Button variant='success' className='w-100' type='submit'>Đăng ký</Button>
                </Form>
            </div>
        </div>
    )
}

export default RegisterOwner