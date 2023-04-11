import React, { useState, useEffect } from 'react'
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import Badge from '../badge/Badge'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useStore, actions } from "../../store";
import { URL_BACKEND } from '../../store/actions/constants';
import moment from 'moment';


function ReceiveDetail({ ...children }) {
    const [state, dispatch] = useStore()
    const listRentalInvoices = state.invoices
    const rentalStatus = {
        "UNAVAILABLE": "warning",
        "AVAILABLE": "success",
        "STOP_RENTING": "danger"
    }

    const inspectionStatus = {
        "WAITING UPDATE": "primary",
        "VERIFIED": "success",
        "PENDING": "warning"
    }

    const transportationDeliveryStatus = {
        'RETURNING_REQUEST': "warning",
        'RECEIVING': "primary",
        'RECEIVIE SUCESSFULL': "success",
        'RECEIVIE FAIL': "danger",
    }

    const generalStatus = {
        'PENDING': "warning",
        'CONFIRM': "success",
        'CANCEL': "danger",
        'BREACH': "danger",
        'IN CONTRACT': "primary",
        'ENDED': "success"
    }

    const paymentStatus = {
        'PENDING': "warning",
        '30%': "primary",
        'COMPLETED': "success",
        'UNCOMPLETED': "danger"
    }

    const { bodyDetail, route } = children

    //onst invoiceReceive = listRentalInvoices.find(rent => rent.id === Number.parseInt(bodyDetail))

    const [invoiceReceiveState, setInvoiceReceiveState] = useState(bodyDetail)

    const { payment_status, rental_status, transportation_status } = invoiceReceiveState

    const startDate = new Date(invoiceReceiveState.start_day);
    const endDate = new Date(invoiceReceiveState.end_day);
    const daysBetween = differenceInDays(endDate, startDate);

    const onReceiveUpdate = (e) => {
        setInvoiceReceiveState({ ...invoiceReceiveState, [e.target.name]: e.target.value })
    }

    const handleShowForm = (e) => {
        const hideItems = document.querySelectorAll('.hide')
        hideItems.forEach((item) => {
            item.classList.remove('hide')
        })

        const table = document.querySelector('table.table-receive')
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

    const handleAcceptReceive = (e) => {
        // e.preventDefault()
        setInvoiceReceiveState({ ...invoiceReceiveState, transportation_status: "RECEIVING", idStaff: localStorage.getItem('idStaff') })
    }

    const handleSuccessFullReceive = () => {
        setInvoiceReceiveState({ ...invoiceReceiveState, transportation_status: "RECEIVIE SUCESSFULL", general_status: "ENDED", idStaff: localStorage.getItem('idStaff'), payment_status: "COMPLETED" })
    }

    const handleFailedReceive = () => {
        if (invoiceReceiveState.payment_status === "30%") {
            setInvoiceReceiveState({ ...invoiceReceiveState, transportation_status: "RECEIVIE FAIL", general_status: "BREACH", idStaff: localStorage.getItem('idStaff'), payment_status: "30%" })
        }
        if (invoiceReceiveState.payment_status === "COMPLETED") {
            setInvoiceReceiveState({ ...invoiceReceiveState, transportation_status: "RECEIVIE FAIL", general_status: "BREACH", idStaff: localStorage.getItem('idStaff'), payment_status: "COMPLETED" })
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setInvoiceReceiveState(invoiceReceiveState)
        handleHideForm()
        console.log(invoiceReceiveState);
    }

    const updateInvoiceAsync = async (id) => {
        console.log("------------------1--------------------", invoiceReceiveState)

        try {
            const response = await axios.put(`${URL_BACKEND}/api/staff/invoices/update/receive/${invoiceReceiveState._id}`, invoiceReceiveState)
            console.log(response.data);
            if (response.data.success) {
                console.log("---------------------------------------", response.data.updateInvoice)
                setInvoiceReceiveState(response.data.updateInvoice)
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }

    useEffect(() => {
        const fectchData = async () => {
            if (transportation_status === 'RECEIVING') {
                updateInvoiceAsync(invoiceReceiveState._id)
                console.log("receiving ------------- okeeee--------",);
                dispatch(actions.setRenderReceive(true))
            }

            if (transportation_status === 'RECEIVIE SUCESSFULL') {
                await updateInvoiceAsync(invoiceReceiveState._id)
                dispatch(actions.setRenderReceive(true))
            }

            if (transportation_status === 'RECEIVIE FAIL') {
                await updateInvoiceAsync(invoiceReceiveState._id)
                dispatch(actions.setRenderReceive(true))
            }
        }

        fectchData()
    }, [transportation_status])

    // useEffect(() => {

    //     setInvoiceReceiveState(invoiceReceiveState)
    //     console.log(invoiceReceiveState);

    // }, [invoiceReceiveState])

    return (
        <div className="py-4">
            <h2 className="page-header">
                Receive detail
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Form onSubmit={handleOnSubmit}>
                                <table className="table-receive">
                                    <tbody>
                                        <tr>
                                            <td>Name Car</td>
                                            <td>{invoiceReceiveState.car_ID.name}</td>
                                        </tr>
                                        <tr>
                                            <td>License Plates</td>
                                            <td>{invoiceReceiveState.car_ID.license_plates}</td>
                                        </tr>
                                        <tr>
                                            <td>Cost</td>
                                            <td>
                                                {new Intl.NumberFormat().format(invoiceReceiveState.car_ID.price)} VND/ngày
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Start Day</td>
                                            <td>
                                                {moment(invoiceReceiveState.start_day).format("MM/DD/YYYY")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>End Day</td>
                                            <td>
                                                {moment(invoiceReceiveState.end_day).format("MM/DD/YYYY")}

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Cost</td>
                                            <td>
                                                {new Intl.NumberFormat().format(daysBetween * invoiceReceiveState.car_ID.price)} VND
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Customer Name</td>
                                            <td>{invoiceReceiveState.customer_ID.fullname}</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Phone</td>
                                            <td>{invoiceReceiveState.customer_ID.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Address</td>
                                            <td>{invoiceReceiveState.customer_ID.address}</td>
                                        </tr>

                                        <tr>
                                            <td>Return location</td>
                                            <td>{invoiceReceiveState.returning_location}</td>
                                        </tr>

                                        {
                                            route !== "history" && (
                                                <>
                                                    {/* <tr>
                                                        <td>delivery location</td>
                                                        <td>{invoiceReceiveState.delivery_location}</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Payment Status</td>
                                                        <td>
                                                            <select
                                                                name="payment_status"
                                                                defaultValue={payment_status}
                                                                className='hide'
                                                                onChange={onReceiveUpdate}
                                                            >
                                                                <option value="PENDING">PENDING</option>
                                                                <option value="COMPLETED">COMPLETED</option>
                                                                <option value="UNCOMPLETED">UNCOMPLETED</option>
                                                                <option value="30%">30%</option>
                                                            </select>
                                                            <span className="span">
                                                                <Badge type={paymentStatus[invoiceReceiveState.payment_status]} content={invoiceReceiveState.payment_status} />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Transportation Status</td>
                                                        <td>
                                                            <select
                                                                name="transportation_status"
                                                                value={transportation_status}
                                                                onChange={onReceiveUpdate}
                                                                className='hide'
                                                            >
                                                                <option value="RETURNING_REQUEST">RETURNING REQUEST</option>
                                                                <option value="RECEIVING">RECEIVING</option>
                                                                <option value="RECEIVIE SUCESSFULL">RECEIVIE SUCESSFULL</option>
                                                                <option value="RECEIVIE FAIL">RECEIVIE FAIL</option>
                                                            </select>
                                                            <span className="span">
                                                                <Badge type={transportationDeliveryStatus[invoiceReceiveState.transportation_status]} content={invoiceReceiveState.transportation_status} />
                                                            </span>
                                                        </td>

                                                    </tr>
                                                </>
                                            )
                                        }

                                        <tr>
                                            <td>General Status</td>
                                            <td>
                                                <Badge type={generalStatus[invoiceReceiveState.general_status]} content={invoiceReceiveState.general_status} />
                                            </td>
                                        </tr>
                                        {children.route === "transportation" &&
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Button variant='success' onClick={handleAcceptReceive}>Accept</Button>
                                                </td>
                                            </tr>
                                        }

                                        {
                                            children.route === "activity" &&
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Button variant='success' onClick={handleSuccessFullReceive} className='me-3'>Receive Successfull</Button>
                                                    <Button variant='danger' onClick={handleFailedReceive}>Receive Fail</Button>
                                                </td>
                                            </tr>
                                        }
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

export default ReceiveDetail