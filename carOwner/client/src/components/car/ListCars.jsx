import React, { useState, useRef, useCallback, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import Pill from '../Pill/Pill'
import moment from 'moment'

import { CarContext } from '../../contexts/CarContext'

function ListCars() {
    const { carState: { cars }, getCars } = useContext(CarContext)

    useEffect(() => {
        getCars()
    }, [getCars])

    return (
        cars && (
            <div className="border rounded p-4 shadow">
                <h2 className="section-title mb-4">Xe của bạn</h2>
                <table className='w-100 table-profile'>
                    <thead>
                        <tr>
                            <th>Tên xe</th>
                            <th>Hãng sản xuất</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Kiểm tra</th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {
                            cars.map((car, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{car.name}</td>
                                        <td>{car.manufacturer}</td>
                                        <td>{moment(car.start_day).format('MM/DD/YYYY')}</td>
                                        <td>{moment(car.end_day).format('MM/DD/YYYY')}</td>
                                        <td>{<Pill type={car.inspection_status}/>}</td>
                                        <td>
                                            <Link to={'/cars/' + car._id} >
                                                Xem chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        ))
}

export default ListCars