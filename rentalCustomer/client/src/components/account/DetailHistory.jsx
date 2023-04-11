import React, { useContext, useEffect, useState } from 'react'
import './account.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Document from './Document'

import moment from 'moment'

import { countDate } from '../../utils/dateFunction'

import { AccountContext } from '../../contexts/AccountContext'

function DetailHistory({ rentalInvoiceID }) {
    const { accountState: { rentalHistory } } = useContext(AccountContext)

    const rentalData = rentalHistory.filter((rentInvoice) => {
        return rentInvoice._id === rentalInvoiceID
    })

    console.log(rentalData)

    return (
        <div className="profile-detail border rounded p-4 shadow fs-5">
            <h2 className="section-title mb-4">Chi tiết hóa đơn thuê xe</h2>
            <Form className='mb-3'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className='me-4'>
                                    <span className='fw-bold fs-3'>Thông tin Xe Thuê</span>
                                </div>

                                <div className='mt-2'>
                                    <span>
                                        <img width={'400px'} src="https://res.cloudinary.com/dffgj00gs/image/upload/v1680788738/51D-580.31_qilonn.png" alt="" />
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span className='fw-slice'>Tên xe: </span>
                                    <span className='fw-bold'>{rentalData[0].car_ID.name}</span>
                                </div>

                                <div className='mt-3'>
                                    <span className='fw-slice'>Loại: </span>
                                    <span className='fw-bold'>{rentalData[0].car_ID.type}</span>
                                </div>

                                <div className='mt-3'>
                                    <span className='fw-slice'>Biển số: </span>
                                    <span className='fw-bold'>{rentalData[0].car_ID.license_plates}</span>
                                </div>

                                <div className='mt-3'>
                                    <span className='fw-slice'>Hãng sản xuất: </span>
                                    <span className='fw-bold'>{rentalData[0].car_ID.manufacturer}</span>
                                </div>

                                <div className='mt-3'>
                                    <span className='fw-slice'>Năm sản xuất: </span>
                                    <span className='fw-bold'>{rentalData[0].car_ID.manufacturer_year}</span>
                                </div>

                                <div className='mt-3'>
                                    <span className='fw-slice'>Giá thuê: </span>
                                    <span className='fw-bold'>{new Intl.NumberFormat().format(rentalData[0].car_ID.price)} VNĐ</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='me-4'>
                                    <span className='fw-bold fs-3'>Thông tin đơn thuê</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='mt-3'>
                                    <span>Ngày bắt đầu thuê: </span>
                                    <span className='fw-bold'>{moment(rentalData[0].start_day).format("MM/DD/YYYY")}</span>
                                </div>
                            </td>
                            <td>
                                <div className='mt-3'>
                                    <span>Ngày kết thuê: </span>
                                    <span className='fw-bold'>{moment(rentalData[0].end_day).format("MM/DD/YYYY")}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='mt-3'>
                                    <span>Thời gian giao xe (dự kiến): </span>
                                    <span className='fw-bold'>{moment(rentalData[0].start_day).add(-1, 'day').format("MM/DD/YYYY")}</span>
                                </div>
                            </td>
                            <td>
                                <div className='mt-3'>
                                    <span>Thời gian trả xe (dự kiến):</span>
                                    <span className='fw-bold'>{moment(rentalData[0].end_day).add(1, 'day').format("MM/DD/YYYY")}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className='mt-3'>
                                    <span>Địa chỉ giao xe:</span>
                                    <span className='fw-bold'>{rentalData[0].delivery_location}</span>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className='mt-3'>
                                    <span>Địa chỉ trả xe: </span>
                                    <span className='fw-bold'>{rentalData[0].returning_location}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='mt-3'>
                                    <span>Tổng hóa đơn: </span>
                                    <span className='fw-bold'>{new Intl.NumberFormat().format(rentalData[0].car_ID.price * countDate(rentalData[0].start_day, rentalData[0].end_day))} VNĐ</span>
                                </div>
                            </td>
                            <td>
                                <div className='mt-3'>
                                    <span>Tình trạng thanh toán: </span>
                                    <span className='fw-bold'>{rentalData[0].payment_status}</span>
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td>
                                <div className='mt-3'>
                                    <span>Tình trạng chung: </span>
                                    <span className='fw-bold'>{rentalData[0].general_status}</span>
                                </div>
                            </td>
                            <td>
                                <div className='mt-3'>
                                    <span>Tình trạng vận chuyển: </span>
                                    <span className='fw-bold'>{rentalData[0].transportation_status}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>

        </div>
    )
}

export default DetailHistory