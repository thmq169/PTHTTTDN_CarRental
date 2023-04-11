import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import Badge from '../badge/Badge'
import { useStore, actions } from "../../store";
import { LOCAL_STORAGE_TOKEN_NAME, URL_BACKEND } from '../../store/actions/constants'
// import listRentalInvoices from '../../assets/JsonData/rental-invoice.json'
// import listCustomers from '../../assets/JsonData/customers-list.json'
// import listCars from '../../assets/JsonData/car-list.json'

const rentalInVoiceTableHead = [
    'Car Name',
    'Start Day',
    'End Day',
    'General Status',
    'Payment Status',
    'Transportation Status',
    'Customer Name',
    'Action'
]

const paymentStatus = {
    'PENDING': "warning",
    '30%': "primary",
    'COMPLETED': "success",
    'UNCOMPLETED': "danger"
}

const generalStatus = {
    'PENDING': "warning",
    'CONFIRM': "success",
    'CANCEL': "danger",
    'BREACH': "warning",
    'IN CONTRACT': "primary",
    'ENDED': "success"
}

const transportationRentalInvoiceStatus = {
    'DELIVERY_REQUEST': "warning",
    'DELIVERING': "primary",
    'DELIVERY SUCESSFULL': "success",
    'DELIVERY FAIL': "danger",
    'RETURNING_REQUEST': "warning",
    'RECEIVING': "primary",
    'RECEIVIE SUCESSFULL': "success",
    'RECEIVIE FAIL': "danger",
    'PENDING': "warning",
}

const renderHead = (item, index) => <th key={index}>{item}</th>

function ListRentalInvoice({ rentalInvoices }) {
    const [state, dispatch] = useStore()

    const [rentalInvoiceState, setRentalInvoicesState] = useState(rentalInvoices)

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.car_ID.name}</td>
            <td>{moment(item.start_day).format("MM/DD/YYYY")}</td>
            <td>{moment(item.end_day).format("MM/DD/YYYY")}</td>
            <td><Badge type={generalStatus[item.general_status]} content={item.general_status} /></td>
            <td><Badge type={paymentStatus[item.payment_status]} content={item.payment_status} /></td>
            <td><Badge type={transportationRentalInvoiceStatus[item.transportation_status]} content={item.transportation_status} /></td>
            <td>{item.customer_ID.fullname}</td>
            <td>
                <Link to={`/rental-invoice/` + item._id}>
                    <Button variant="success">Detail</Button>
                </Link>
            </td>
        </tr>
    )



    useEffect(() => {
        setRentalInvoicesState(rentalInvoices)

    }, [rentalInvoices])


    return (
        <div>
            <h2 className="page-header">
                Rental Invoice
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                // limit='10'
                                headData={rentalInVoiceTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={rentalInvoiceState}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListRentalInvoice