import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Badge from '../badge/Badge'
import { useParams } from 'react-router-dom'
import './car.css'

import Pill from '../Pill/Pill'

import moment from 'moment'

import { CarContext } from '../../contexts/CarContext'

function CarDetail() {
    const { idCar } = useParams()

    const { getCar, carState: { car, invoiceOfCar } } = useContext(CarContext)

    useEffect(() => {
        getCar(idCar)
    }, [idCar])

    return (
        car && (
            <div>
                <h2 className="page-header">
                    Chi tiết xe thuê
                </h2>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <div className='row'>
                                    <div className='col'>
                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Tên: </span>
                                            {car.name}
                                        </div>

                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Biển số: </span>
                                            {car.license_plates}
                                        </div>

                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Loại: </span>
                                            {car.type}
                                        </div>

                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Hãng sản xuất: </span>
                                            {car.manufacturer}
                                        </div>

                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Năm sản xuất: </span>
                                            {car.manufacturer_year}
                                        </div>

                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Giá cho thuê: </span>
                                            {new Intl.NumberFormat().format(car.price)} VNĐ/ngày
                                        </div>

                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Tình trạng xác thực: </span>
                                            <Pill type={car.inspection_status}/>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='me-4 mt-3'>
                                            <span className='fw-bold'>Hình ảnh: </span>
                                            <img width={'500px'} height={'300px'} src={car.image}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='col-12'>
                            <div className='card border'>
                                <span>Danh sách cho thuê</span>


                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <div className='row'>
                                            <div className='col'>Ngày bắt đầu </div>
                                            <div className='col'>Ngày kết thúc</div>
                                            <div className='col'>Tình trạng chung</div>
                                            <div className='col'>Tổng hóa đơn</div>
                                        </div>
                                    </li>
                                    {invoiceOfCar.map((invoice) => (
                                        <li class="list-group-item">
                                            <div className='row'>
                                                <div className='col'>{moment(invoice.start_day).format("MM/DD/YYYY")}</div>
                                                <div className='col'>{moment(invoice.end_day).format("MM/DD/YYYY")}</div>
                                                <div className='col'><Pill type={invoice.general_status} /></div>
                                                <div className='col'>{new Intl.NumberFormat().format(car.price * (moment(invoice.end_day).diff(moment(invoice.start_day), 'day') + 1))} VNĐ</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    )
}

export default CarDetail