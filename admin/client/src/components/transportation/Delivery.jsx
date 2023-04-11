import React, { useState, useRef, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import DeliveryDetail from './DeliveryDetail'
import Badge from '../badge/Badge'
import { useStore, actions } from "../../store"
import { URL_BACKEND } from '../../store/actions/constants'

import moment from 'moment'

const deliveryTableHead = [
    'Car Name',
    'Thời gian giao xe (8:00 - 20:00)',
    'Delivery Location',
    'Transportation Status',
    'Customer Name',
    'Action'
]

let historyTableHead = [
    'Car Name',
    'Thời gian nhận xe (8:00 - 20:00)',
    'Delivery Location',
    'General Status',
    'Customer Name',
    'Action'
]

const transportationDeliveryStatus = {
    'DELIVERY_REQUEST': "warning",
    'DELIVERING': "primary",
    'DELIVERY SUCESSFULL': "success",
    'DELIVERY FAIL': "danger",
}

const generalStatus = {
    'PENDING': "warning",
    'CONFIRM': "success",
    'CANCEL': "danger",
    'BREACH': "danger",
    'IN CONTRACT': "primary",
    'ENDED': "success"
}

const renderHead = (item, index) => <th key={index}>{item}</th>

function Delivery({ deliveryState, hanleSetRenderDelivery, route }) {
    const [state, dispatch] = useStore()

    let headTable

    if (route === "history") {
        headTable = historyTableHead
    }
    else {
        headTable = deliveryTableHead
    }

    const [rentalInvoices, setRentalInvoices] = useState(deliveryState)

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.car_ID.name}</td>
            <td>{moment(item.start_day).add(-1, 'day').format("MM/DD/YYYY")}</td>
            <td>{item.delivery_location}</td>
            {
                route === 'history' &&
                <td><Badge type={generalStatus[item.general_status]} content={item.general_status} /></td>

            }
            {
                route !== 'history' && <td><Badge type={transportationDeliveryStatus[item.transportation_status]} content={item.transportation_status} /></td>
            }

            <td>{item.customer_ID.fullname}</td>
            <td>
                {
                    route === "activity" &&
                    (
                        <Link to={`/activity/detail/` + item._id}>
                            <Button variant="success">Detail</Button>
                        </Link>
                    )
                }

                {
                    route === "transportation" &&
                    (
                        <Link to={`/transportation/delivery-detail/` + item._id}>
                            <Button variant="success">Detail</Button>
                        </Link>
                    )
                }
                {
                    route === "history" &&
                    (
                        <Link to={`/history/delivery-hitory-detail/` + item._id}>
                            <Button variant="success">Detail</Button>
                        </Link>
                    )
                }

            </td>
        </tr>
    )
    useEffect(() => {
        setRentalInvoices(deliveryState)
    }, [deliveryState])

    let body = (
        <Table
            headData={headTable}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={rentalInvoices}
            renderBody={(item, index) => renderBody(item, index)}
        />
    )

    const { idDelivery } = useParams()

    if (idDelivery) {
        const invoiceDelivery = rentalInvoices.find(rent => rent._id === idDelivery)
        body = (<><DeliveryDetail
            bodyDetail={invoiceDelivery}
            handleSetRender={hanleSetRenderDelivery}
            route={route}
        /></>)
    }

    return (
        <>
            {body}
        </>
    )
}

export default Delivery