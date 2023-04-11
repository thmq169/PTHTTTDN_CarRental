import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Badge from '../badge/Badge'

import moment from 'moment'

import { AuthContext } from '../../contexts/AuthContext'
import { MessageContext } from '../../contexts/MessageContext'

function OwnerDetail() {
    const { authState: { user, documents, accountLoading }, updateAccount, loadUser } = useContext(AuthContext)
    const { notifyMessage } = useContext(MessageContext)

    const initState = {
        username: user ? user.username : "",
        phone_number: user ? user.phone_number : "",
        fullname: user ? user.fullname : "",
        email: user ? user.email : "",
        address: user ? user.address : "",
        CIC_id: documents ? documents._id : "",
        CIC_lincense: documents ? documents.lincense_ID : "",
        CIC_date: documents ? moment(documents.date).format('YYYY-MM-DD') : "",
        CIC_status: documents ? documents.status : ""
    }

    const [infoForm, setInfoForm] = useState(initState)

    const [isDisabled, setIsDisabled] = useState(true)

    const {
        username,
        phone_number,
        fullname,
        email,
        address,
        CIC_lincense,
        CIC_date,
        CIC_status
    } = infoForm

    const handleOnChangeInfoForm = (e) => {
        setInfoForm({ ...infoForm, [e.target.name]: e.target.value })
    }

    console.log(accountLoading)

    const onSubmitUpdate = async (e) => {
        e.preventDefault()

        const updateData = await updateAccount(infoForm)

        console.log("--------", updateData)
        notifyMessage("success", "Cập nhật thông tin thành công")
        setIsDisabled(!isDisabled)


    }

    return (
        <div>
            <h2 className="page-header">
                Thông tin cá nhân
            </h2>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Form className='mb-3' onSubmit={onSubmitUpdate}>
                                <table>
                                    <tbody className='table-profile'>
                                        <tr>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Họ và tên:</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="text"
                                                            placeholder='fullname'
                                                            name='fullname'
                                                            disabled={isDisabled}
                                                            value={fullname}
                                                            onChange={handleOnChangeInfoForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Username:</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="text"
                                                            placeholder='username'
                                                            name='username'
                                                            value={username}
                                                            disabled={isDisabled}
                                                            onChange={handleOnChangeInfoForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Địa chỉ:</span>
                                                    <Form.Group>
                                                        <Form.Control type="text"
                                                            placeholder='address'
                                                            name='address'
                                                            value={address}
                                                            disabled={isDisabled}
                                                            onChange={handleOnChangeInfoForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Số điện thoại:</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="text"
                                                            placeholder='phone_number'
                                                            name='phone_number'
                                                            value={phone_number}
                                                            disabled={isDisabled}
                                                            onChange={handleOnChangeInfoForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Email:</span>
                                                    <Form.Group>
                                                        <Form.Control type="text"
                                                            placeholder='email'
                                                            name='email'
                                                            value={email}
                                                            disabled={isDisabled}
                                                            onChange={handleOnChangeInfoForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Số căn cước cước công dân:</span>
                                                    <Form.Group>
                                                        <Form.Control type="text"
                                                            placeholder='address'
                                                            name='CIC_lincense'
                                                            value={CIC_lincense}
                                                            disabled={isDisabled}
                                                            onChange={handleOnChangeInfoForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Ngày cấp:</span>
                                                    <Form.Group>
                                                        <Form.Control className='w-auto' type="date"
                                                            placeholder='phone_number'
                                                            name='CIC_date'
                                                            value={CIC_date}
                                                            disabled={isDisabled}
                                                            onChange={handleOnChangeInfoForm}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='me-4'>
                                                    <span className='fw-bold'>Trạng thái: </span> <br />
                                                    {CIC_status}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className='d-flex justify-content-between'>
                                    {
                                        isDisabled &&
                                        (<Button variant='primary'
                                            type='submit'
                                            onClick={() => { setIsDisabled(!isDisabled) }}
                                        >Chỉnh sửa</Button>)
                                    }

                                    {
                                        !isDisabled &&
                                        (<Button variant='danger'
                                            type='submit'
                                            onClick={() => {
                                                setIsDisabled(!isDisabled)
                                                setInfoForm({ ...initState })
                                            }}
                                        >Hủy</Button>)
                                    }

                                    {
                                        !isDisabled && !accountLoading &&
                                        (<Button variant='success'
                                            type='submit'
                                        >Cập nhật</Button>)
                                    }

                                    {
                                        !isDisabled && accountLoading &&
                                        (<Button variant='success'
                                            disabled
                                        >Loading</Button>)
                                    }
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default OwnerDetail