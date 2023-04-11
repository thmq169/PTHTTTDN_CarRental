import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LOCAL_STORAGE_TOKEN_NAME, URL_BACKEND } from '../../store/actions/constants'

function StaffDetail({ staff }) {

    const [show, setShow] = useState(false);
    const [editStaff, setEditStaff] = useState(staff)
    const [render, setRender] = useState(false)
    const [modalEditStaff, setModalEditStaff] = useState({
        username: staff.username,
        email: staff.email,
        fullname: staff.fullname,
        address: staff.address,
        role: staff.role
    })

    const { username, password, email, fullname, address, role } = editStaff

    const updateUser = async (id) => {
        try {
            const response = await axios.put(`${URL_BACKEND}/api/staff/auth/${id}`, modalEditStaff)
            console.log(response.data);
            if (response.data.success) {
                return response.data
            }
            // await loadUser()
        } catch (error) {
            // lỗi có chủ đích được lấy từ api của ta
            if (error.response.data) {
                return error.response.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }

    const onChangeNewStaffForm = (e) => {
        setModalEditStaff({ ...modalEditStaff, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (e) => {
        setShow(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { updateStaff } = await updateUser(staff._id)
        setEditStaff(updateStaff)
        handleClose()
        setRender(!render)
        console.log(updateStaff);
    }

    const handleSetRender = () => {
        setRender(!render)
    }

    useEffect(() => {
        console.log(editStaff);
    }, [editStaff])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Edit Staff</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Text>Full Name</Form.Text>
                            <Form.Control type='text' placeholder='Fullname'
                                name='fullname'
                                required
                                value={modalEditStaff.fullname}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Text>User Name</Form.Text>
                            <Form.Control type='text'
                                placeholder='User Name'
                                name='username'
                                value={modalEditStaff.username}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Text>Email</Form.Text>
                            <Form.Control type='email'
                                placeholder='Email'
                                name='email'
                                value={modalEditStaff.email}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Text>Address</Form.Text>
                            <Form.Control type='text'
                                placeholder='Address'
                                name='address'
                                value={modalEditStaff.address}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Text>Role</Form.Text>
                            <Form.Control
                                as="select"
                                value={modalEditStaff.role}
                                name="role"
                                onChange={onChangeNewStaffForm}
                            >
                                <option value="HR">HR</option>
                                <option value="INFORMATION MANAGEMENT STAFF">Information Management Staff</option>
                                <option value="SALES STAFF">Sales Staff</option>
                                <option value="TRANSPORTATION STAFF">Transportation Staff</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Cancel</Button>
                        <Button variant='primary' type='submit'>Edit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <h2 className="page-header">
                staff detail
            </h2>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Username</td>
                                        <td>{username}</td>
                                    </tr>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>{fullname}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{email}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{address}</td>
                                    </tr>
                                    <tr>
                                        <td>Role</td>
                                        <td>{role}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><Button variant='success' onClick={handleShow} className='mb-3'>Update</Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffDetail