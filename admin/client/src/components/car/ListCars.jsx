import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import Badge from '../badge/Badge'
import { useStore, actions } from "../../store";
import { URL_BACKEND } from '../../store/actions/constants'
// import listCar from '../../assets/JsonData/car-list.json'

const carsHead = [
    'Car name',
    'License Plate',
    'cost',
    'inspection status',
    'action'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

function ListCars() {


    const [cars, setCars] = useState([])

    useEffect(() => {
        const data = axios.get(URL_BACKEND + "/api/staff/cars")
            .then((response) =>
                response.data
            ).then(data => {
                console.log(data);
                setCars(data.cars)
            })
    }, [])

    const rentalStatus = {
        "PENDING": "warning",
        "VERIFIED": "success",
        "WAITING UPDATE": "warning"
    }

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.license_plates}</td>
            <td>
                {new Intl.NumberFormat().format(item.price)} VND/ngày
            </td>
            <td><Badge type={rentalStatus[item.inspection_status]} content={item.inspection_status} /></td>
            <td>
                <Link to={`/cars/` + item._id}>
                    <Button variant="success">Detail</Button>
                </Link>
            </td>
        </tr>
    )

    return (
        <div>
            <h2 className="page-header">
                cars
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                // limit='10'
                                headData={carsHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={cars}
                                renderBody={(item, index) => renderBody(item, index)}
                            />


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCars