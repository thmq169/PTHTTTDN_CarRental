import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LOCAL_STORAGE_TOKEN_NAME, URL_BACKEND } from '../../store/actions/constants'
import { actions, useAuth, useStore } from '../../store'
import setAuthToken from '../../utils/setAuthToken'

function ModalAddStaff({ onRender }) {
    const [authState, authDispatch] = useAuth()
    const [state, dispatch] = useState()
    const [newStaff, setNewStaff] = useState({
        username: '',
        password: '',
        fullname: '',
        email: '',
        address: '',
        role: "HR",
    })

    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    })

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)

    const { username, password, email, fullname, address, role } = newStaff

    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(`${URL_BACKEND}/api/staff/auth/register`, userForm)
            console.log(response.data);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
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

    // const loadUser = async () => {
    //     if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    //         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    //     }

    //     try {
    //         const response = await axios.get(`${URL_BACKEND}/api/staff/auth`)
    //         if (response.data.success) {
    //             authDispatch(actions.setAuth(true))
    //             authDispatch(actions.setUser(response.data.role))
    //         }
    //         else {
    //             localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    //             setAuthToken(null)
    //             authDispatch(actions.setAuth(false))
    //             authDispatch(actions.setUser(null))
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    //         setAuthToken(null)
    //         authDispatch(actions.setAuth(false))
    //         authDispatch(actions.setUser(null))
    //     }
    // }

    const onChangeNewStaffForm = (e) => {
        setNewStaff({ ...newStaff, [e.target.name]: e.target.value })
    }

    const closeAddStaffModal = () => {
        resetDialog()
    }

    const resetDialog = () => {
        setNewStaff({
            username: '',
            password: '',
            fullname: '',
            email: '',
            address: '',
            role: "HR",
        })
        setShowModal(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const { message, success } = await registerUser(newStaff)
        dispatch(actions.setNewStaff(newStaff))
        resetDialog()
        onRender()
        // navigate('/staffs')
    }

    return (
        <>
            <Button variant='success' onClick={() => {
                setShowModal(true);
            }} className='mb-3'>Add New Staff</Button>

            <Modal show={showModal} onHide={closeAddStaffModal}>
                <Modal.Header closeButton onClick={closeAddStaffModal}>
                    <Modal.Title>Add New Staff</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Control type='text' placeholder='Fullname'
                                name='fullname' required
                                aria-describedby='title-help'
                                value={fullname}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                placeholder='User Name'
                                name='username'
                                value={username}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                placeholder='Address'
                                name='address'
                                value={address}
                                onChange={onChangeNewStaffForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                value={role}
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
                        <Button variant='secondary' onClick={closeAddStaffModal}>Cancel</Button>
                        <Button variant='primary' type='submit'>Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAddStaff