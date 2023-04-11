import React, { useContext, useEffect, useState } from 'react'
import './account.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Document from './Document'

import defineDocumentType from '../../utils/defineDocumentType'

import formatDate from '../../utils/formatDate'

import { AuthContext } from '../../contexts/AuthContext'
import { AccountContext } from '../../contexts/AccountContext'

import { MessageContext } from '../../contexts/MessageContext'

function Account() {
    const { authState: { user, documents }, loadUser } = useContext(AuthContext)

    const { accountState: { accountLoading }, updateAccount } = useContext(AccountContext)

    const { notifyMessage } = useContext(MessageContext)

    const { CIC, driverLicense } = defineDocumentType(documents)

    const [isDisabled, setIsDisabled] = useState(true)

    loadUser()

    let initState = {
            fullname: user.fullname,
            username: user.username,
            address: user.address,
            email: user.email,
            phone_number: user.phone_number,
            CIC_id: CIC.id,
            CIC_lincense_ID: CIC.lincense_ID,
            CIC_date: CIC.date,
            CIC_status: CIC.status,
            driverLicense_id: driverLicense.id,
            driverLicense_lincense_ID: driverLicense.lincense_ID,
            driverLicense_date: driverLicense.date,
            driverLicense_status: driverLicense.status
        }

    const [information, setInformation] = useState(initState)

    const handleOnchangeInformation = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.value })
    }

    const CICData = {
        type: 'Căn cước công dân',
        lisence_ID: information.CIC_lincense_ID,
        date: formatDate(information.CIC_date),
        status: information.CIC_status,
        isDisabled,
        id_name_input: 'CIC_lincense_ID',
        id_date_input: 'CIC_date',
        handleOnchangeInformation
    }

    const driveLicenseData = {
        type: 'Bằng lái xe',
        lisence_ID: information.driverLicense_lincense_ID,
        date: formatDate(information.driverLicense_date),
        status: information.driverLicense_status,
        isDisabled,
        id_name_input: 'driverLicense_lincense_ID',
        id_date_input: 'driverLicense_date',
        handleOnchangeInformation
    }

    const onUpdateSubmit = async (e) => {
        e.preventDefault()
        const updateDate = await updateAccount(information)

        if (updateDate) {
            setIsDisabled({isDisabled: false})
            notifyMessage('success', 'chỉnh sửa thông tin thành công')
        } else {
            notifyMessage('warning', 'chỉnh sửa thông tin không thành công')
        }
    }

    return (
        <div className="profile-detail border rounded p-4 shadow fs-5">
            <h2 className="section-title mb-4">Tài Khoản</h2>
            <Form className='mb-3' onSubmit={onUpdateSubmit}>
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
                                            required
                                            value={information.fullname}
                                            onChange={handleOnchangeInformation}
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
                                            disabled={isDisabled}
                                            required
                                            value={information.username}
                                            onChange={handleOnchangeInformation}
                                        />
                                    </Form.Group>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className='me-4'>
                                    <span className='fw-bold'>Địa chỉ:</span>
                                    <Form.Group>
                                        <Form.Control type="text"
                                            placeholder='address'
                                            name='address'
                                            disabled={isDisabled}
                                            required
                                            value={information.address}
                                            onChange={handleOnchangeInformation}
                                        />
                                    </Form.Group>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='me-4'>
                                    <span className='fw-bold'>Số điện thoại:</span>
                                    <Form.Group>
                                        <Form.Control className='w-auto' type="text"
                                            placeholder='phone_number'
                                            name='phone_number'
                                            disabled={isDisabled}
                                            required
                                            value={information.phone_number}
                                            onChange={handleOnchangeInformation}
                                        />
                                    </Form.Group>
                                </div>
                            </td>
                            <td>
                                <div className='me-4'>
                                    <span className='fw-bold'>Email:</span>
                                    <Form.Group>
                                        <Form.Control type="text"
                                            placeholder='email'
                                            name='email'
                                            disabled={isDisabled}
                                            required
                                            value={information.email}
                                            onChange={handleOnchangeInformation}
                                        />
                                    </Form.Group>
                                </div>
                            </td>
                        </tr>

                        <Document documentData={CICData} />
                        <Document documentData={driveLicenseData} />

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
                                setInformation({ ...initState })
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
    )
}

export default Account