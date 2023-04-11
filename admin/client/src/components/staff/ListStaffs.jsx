import React, { useState, useRef, useCallback, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ModalAddStaff from './ModalAddStaff'
import { useStore, actions } from "../../store";
import { URL_BACKEND } from '../../store/actions/constants'
// import listStaff from '../../assets/JsonData/staffs-list.json'

const customerTableHead = [
    'username',
    'email', ,
    'role',
    'action'
]

const renderHead = (item, index) => <th key={index}>{item}</th>
function ListStaffs() {
    const [state, dispatch] = useStore()
    const listStaff = state.staffs

    const [users, setUsers] = useState(listStaff)
    const [render, setRender] = useState(false)
    const [show, setShow] = useState(false);
    const [deleteStaff, setDeleteStaff] = useState("")

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${URL_BACKEND}/api/staff/auth/${id}`)
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

    const handleSetRender = () => {
        setRender(!render)
    }

    const handleClose = () => {
        setShow(false);
        // setDeleteStaff("")
    }

    const handleShow = (e) => {
        setShow(true);
        const id = e.target.dataset.id
        const staff = users.find(user => user._id === id)
        setDeleteStaff(staff);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await deleteUser(deleteStaff._id)
        // const {success, message} = response.data
        handleClose()
        setRender(!render)
        console.log(response.data);
    }

    useEffect(() => {
        console.log(deleteStaff);
    }, [deleteStaff])


    // const dataUserEdit = useRef()

    // const handleDelete = (id) => setUsers(users.filter(item => item.id !== id))

    // const handleUpdate = (id) => {
    //     setOpen(prev => !prev)
    //     const item = listStaff.find(item => item.id === id)
    //     dataUserEdit.current = item
    // }

    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/auth/allStaffs").then((response) =>
            response.data
        ).then(data => {
            dispatch(actions.setStaffs(data))
            setUsers(data)
        })
    }, [render])

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td>

                <Button variant="danger" data-id={item._id} onClick={handleShow} className='me-2'>Delete</Button>

                {/* <Link to={`/staffs/edit/` + item.id}>
                    <Button variant="warning" className='me-2'>Edit</Button>
                </Link> */}
                <Link to={`/staffs/` + item._id}>
                    <Button variant="success">Detail</Button>
                </Link>
            </td>
        </tr>
    )

    return (
        <div>
            <h2 className="page-header">
                Staffs
            </h2>
            <ModalAddStaff onRender={handleSetRender} />

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Delete Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Delete Staff </span><strong> {deleteStaff.fullname}  </strong>
                        <h3 className="mt-3">Are you sure?</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" type='submit'>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                // limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={users}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                            {/* {
                                open && <ModalEdit
                                    dataUserEdit={dataUserEdit}
                                    users={users}
                                    callback={callback}
                                />
                            } */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListStaffs