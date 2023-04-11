import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import ReceiveDetail from './ReceiveDetail'
import Badge from '../badge/Badge'
import { useStore, actions } from "../../store";
// import listRentalInvoices from '../../assets/JsonData/rental-invoice.json'
// import listCustomers from '../../assets/JsonData/customers-list.json'
// import listCars from '../../assets/JsonData/car-list.json'

import moment from 'moment'



let receiveTableHead = [
    'Car Name',
    'Thời gian nhận xe (8:00 - 20:00)',
    'Return Location',
    'Transportation Status',
    'Customer Name',
    'Action'
]

let historyTableHead = [
    'Car Name',
    'Thời gian nhận xe (8:00 - 20:00)',
    'Return Location',
    'General Status',
    'Customer Name',
    'Action'
]

const generalStatus = {
    'PENDING': "warning",
    'CONFIRM': "success",
    'CANCEL': "danger",
    'BREACH': "danger",
    'IN CONTRACT': "primary",
    'ENDED': "success"
}

const transportationReceiveStatus = {
    'RETURNING_REQUEST': "warning",
    'RECEIVING': "primary",
    'RECEIVIE SUCESSFULL': "success",
    'RECEIVIE FAIL': "danger",
}

const renderHead = (item, index) => <th key={index}>{item}</th>

function Receive({ receiveState, route }) {
    const [state, dispatch] = useStore()

    let headTable

    if (route === "history") {
        headTable = historyTableHead
    }
    else {
        headTable = receiveTableHead
    }

    const [rentalInvoices, setRentalInvoices] = useState(receiveState)

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.car_ID.name}</td>
            <td>{moment(item.end_day).add(1, 'day').format('MM/DD/YYYY')}</td>
            <td>{item.returning_location}</td>
            {
                route === 'history' &&
                <td><Badge type={generalStatus[item.general_status]} content={item.general_status} /></td>

            }
            {
                route !== 'history' && <td><Badge type={transportationReceiveStatus[item.transportation_status]} content={item.transportation_status} /></td>
            }

            <td>{item.customer_ID.fullname}</td>

            <td>
                {
                    route === "activity" &&
                    (
                        <Link to={`/activity/receive-activity-detail/` + item._id}>
                            <Button variant="success">Detail</Button>
                        </Link>
                    )
                }

                {
                    route === "transportation" &&
                    (
                        <Link to={`/transportation/receive-detail/` + item._id}>
                            <Button variant="success">Detail</Button>
                        </Link>
                    )
                }

                {
                    route === "history" &&
                    (
                        <Link to={`/history/receive-history-detail/` + item._id}>
                            <Button variant="success">Detail</Button>
                        </Link>
                    )
                }
            </td>
        </tr>
    )

    useEffect(() => {
        setRentalInvoices(receiveState)
    }, [receiveState])

    let body = (
        <Table
            headData={headTable}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={rentalInvoices}
            renderBody={(item, index) => renderBody(item, index)}
        />
    )

    const { idReceive } = useParams()

    if (idReceive) {
        const invoiceReceive = rentalInvoices.find(rent => rent._id === idReceive)
        body = (<><ReceiveDetail
            bodyDetail={invoiceReceive}
            route={route}
        /></>)
    }

    return (
        <>
            {body}
        </>
    )
}

export default Receive