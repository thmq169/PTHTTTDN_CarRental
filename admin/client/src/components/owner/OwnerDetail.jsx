import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Badge from '../badge/Badge'

const ownerInspectionStatus = {
    'PENDING': "warning",
    'WAITING UPDATE': "primary",
    'VERIFIED': "success",
}

const ownerStatus = {
    'PENDING': "warning",
    'WAITING UPDATE': "primary",
    'VERIFIED': "success",
}

const ownerRentalStatus = {
    "UNAVAILABLE": "warning",
    "AVAILABLE": "success",
    "STOP_RENTING": "danger"
}


function OwnerDetail({ owner, ownerDocument, carOwner }) {


    const [ownerState, setOwnerState] = useState(ownerDocument)
    const [carOwnerState, setCarOwnerState] = useState(carOwner)

    const { inspection_status, rental_status } = carOwnerState
    const { status } = ownerState

    const onOwnerUpdate = (e) => {
        setOwnerState({ ...ownerState, [e.target.name]: e.target.value })
    }
    const onCarOwnerUpdate = (e) => {
        setCarOwnerState({ ...carOwnerState, [e.target.name]: e.target.value })
    }

    const handleShowForm = (e) => {
        const hideItems = document.querySelectorAll('.hide')
        hideItems.forEach((item) => {
            item.classList.remove('hide')
        })

        const table = document.querySelector('table')
        const spans = table.querySelectorAll('span.span')
        spans.forEach((span) => {
            span.classList.add('hide')
        })
    }

    const handleHideForm = () => {
        const hideItems = document.querySelectorAll('.hide')
        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')

        hideItems.forEach((item) => {
            item.classList.remove('hide')
        })

        inputs.forEach((input) => {
            input.classList.add('hide')
        })

        selects.forEach((select) => {
            select.classList.add('hide')
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setOwnerState(ownerState)
        setCarOwnerState(carOwnerState)
        handleHideForm()
    }

    useEffect(() => {

        setOwnerState(ownerState)
        setCarOwnerState(carOwnerState)

    }, [ownerState || carOwnerState])

    return (
        <div>
            <h2 className="page-header">
                owner detail
            </h2>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Form onSubmit={handleOnSubmit}>
                                <table>
                                    <tbody>
                                        <div className="row">
                                            <div className="col col-lg-6">
                                                <tr>
                                                    <td>owner ID</td>
                                                    <td>{owner.id}</td>
                                                </tr>
                                                <tr>
                                                    <td>Username</td>
                                                    <td>{owner.username}</td>
                                                </tr>
                                                <tr>
                                                    <td>Full Name</td>
                                                    <td>{owner.fullname}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{owner.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address</td>
                                                    <td>{owner.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        <select
                                                            name="status"
                                                            defaultValue={status}
                                                            className='hide'
                                                            onChange={onOwnerUpdate}
                                                        >
                                                            <option value="PENDING">PENDING</option>
                                                            <option value="WAITING UPDATE">WAITING UPDATE</option>
                                                            <option value="VERIFIED">VERIFIED</option>
                                                        </select>
                                                        <span className="span">
                                                            <Badge type={ownerStatus[status]} content={status} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Lincense ID</td>
                                                    <td>{ownerDocument.lincense_ID}</td>
                                                </tr>
                                                <tr>
                                                    <td>Type Card</td>
                                                    <td>{ownerDocument.type}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date Card</td>
                                                    <td>{ownerDocument.date}</td>
                                                </tr>
                                            </div>
                                            <div className="col col-lg-6">
                                                <tr>
                                                    <td>Car ID</td>
                                                    <td>{carOwner.ID}</td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{carOwner.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Type</td>
                                                    <td>{carOwner.type}</td>
                                                </tr>
                                                <tr>
                                                    <td>Manufacturer</td>
                                                    <td>{carOwner.manufacturer}</td>
                                                </tr>
                                                <tr>
                                                    <td>Manufacturer Year</td>
                                                    <td>{carOwner.manufacturer_year}</td>
                                                </tr>
                                                <tr>
                                                    <td>License plates</td>
                                                    <td>{carOwner.license_plates}</td>
                                                </tr>
                                                <tr>
                                                    <td>Seat</td>
                                                    <td>{carOwner.seat}</td>
                                                </tr>
                                                <tr>
                                                    <td>Transmisson</td>
                                                    <td>{carOwner.transmission}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fuel</td>
                                                    <td>{carOwner.fuel}</td>
                                                </tr>
                                                <tr>
                                                    <td>Inspection Status</td>
                                                    <td>
                                                        <select
                                                            name="inspection_status"
                                                            defaultValue={inspection_status}
                                                            className='hide'
                                                            onChange={onCarOwnerUpdate}
                                                        >
                                                            <option value="PENDING">PENDING</option>
                                                            <option value="WAITING UPDATE">WAITING UPDATE</option>
                                                            <option value="VERIFIED">VERIFIED</option>
                                                        </select>
                                                        <span className="span">
                                                            <Badge type={ownerInspectionStatus[inspection_status]} content={inspection_status} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Rental Status</td>
                                                    <td>
                                                        <select
                                                            name="rental_status"
                                                            defaultValue={rental_status}
                                                            className='hide'
                                                            onChange={onCarOwnerUpdate}
                                                        >
                                                            <option value="UNAVAILABLE">UNAVAILABLE</option>
                                                            <option value="AVAILABLE">AVAILABLE</option>
                                                            <option value="STOP_RENTING">STOP RENTING</option>
                                                        </select>
                                                        <span className="span">
                                                            <Badge type={ownerRentalStatus[carOwner.rental_status]} content={carOwner.rental_status} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Button variant='success' type='submit' className='me-3'>Submit</Button>
                                                        <Button variant='success' onClick={handleShowForm}>Update</Button>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </div>
                                        </div>

                                    </tbody>
                                </table>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerDetail