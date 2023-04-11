import React, { useState, useEffect } from 'react'
import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Badge from '../badge/Badge'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useStore, actions } from "../../store";
import { URL_BACKEND } from '../../store/actions/constants';
// import listRentalInvoices from '../../assets/JsonData/rental-invoice.json'

function DeliveryDetail({ ...children }) {
    const [state, dispatch] = useStore()
    const listRentalInvoices = state.invoices
    const navigate = useNavigate()

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
        'DELIVERY_REQUEST': "warning",
        'DELIVERING': "primary",
        'DELIVERY SUCESSFULL': "success",
        'DELIVERY FAIL': "danger",
        'PENDING': 'warning'
    }

    const generalStatus = {
        'PENDING': "warning",
        'CONFIRM': "success",
        'CANCEL': "danger",
        'BREACH': "warning",
        'IN CONTRACT': "primary",
        'ENDED': "success"
    }

    const paymentStatus = {
        'PENDING': "warning",
        '30%': "primary",
        'COMPLETED': "success",
        'UNCOMPLETED': "danger"
    }

    const { bodyDetail, handleSetRender, route } = children

    const invoiceDelivery = listRentalInvoices.find(rent => rent._id === bodyDetail)

    const [invoiceDeliveryState, setInvoiceDeliveryState] = useState({ ...bodyDetail, idStaff: localStorage.getItem('idStaff') })

    const { car_ID, customer_ID, general_status, payment_status, transportation_status } = invoiceDeliveryState

    const startDate = new Date(invoiceDeliveryState.start_day);
    const endDate = new Date(invoiceDeliveryState.end_day);
    const daysBetween = differenceInDays(endDate, startDate) + 1;

    const onDeliveryUpdate = (e) => {
        setInvoiceDeliveryState({ ...invoiceDeliveryState, [e.target.name]: e.target.value })
    }

    const handleAcceptDelivery = (e) => {
        setInvoiceDeliveryState({ ...invoiceDeliveryState, transportation_status: "DELIVERING", idStaff: localStorage.getItem('idStaff') })
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

    function filterInvoices(listInvoices, string) {
        return listInvoices.filter(rental => rental.transportation_status.toLowerCase() === string)
    }

    function isDeliveryDate(dateStart) {
        const now = Date.now()

        // -1 
        var dateDelivery = new Date(dateStart);
        dateDelivery.setDate(dateDelivery.getDate() - 1);

        const checkDate = moment(now).isSame(dateDelivery, 'day')
        const checkMonth = moment(now).isSame(dateDelivery, 'month')
        const checkYear = moment(now).isSame(dateDelivery, 'year')

        console.log(checkDate, checkMonth, checkYear)

        return checkDate && checkMonth && checkYear

    }


    useEffect(() => {

        const fectchData = async () => {

            if (transportation_status === 'DELIVERING') {
                updateInvoiceAsync(invoiceDeliveryState._id)
                const newInvoices = await axios.get(`${URL_BACKEND}/api/staff/invoices/`)

                let transporDelivery = filterInvoices(newInvoices.data.invoices, "delivery_request")

                transporDelivery = transporDelivery.filter((invoice) => {
                    return isDeliveryDate(invoice.start_day)
                })

                handleSetRender(transporDelivery)
                dispatch(actions.setRenderDelivery(true))
            }

            if (transportation_status === 'DELIVERY SUCESSFULL') {
                await updateInvoiceAsync()
                dispatch(actions.setRenderDelivery(true))
            }

            if (transportation_status === 'DELIVERY FAIL') {
                await updateInvoiceAsync()
                dispatch(actions.setRenderDelivery(true))
            }
        }

        fectchData()
    }, [transportation_status])


    const handleSuccessFullDelivery = () => {
        setInvoiceDeliveryState({ ...invoiceDeliveryState, transportation_status: "DELIVERY SUCESSFULL", general_status: "IN CONTRACT", idStaff: localStorage.getItem('idStaff') })
    }

    const handleFailedDelivery = () => {
        setInvoiceDeliveryState({ ...invoiceDeliveryState, transportation_status: "DELIVERY FAIL", general_status: "CANCEL", idStaff: localStorage.getItem('idStaff') })
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const reponse = await updateInvoice(invoiceDeliveryState._id).then((data) => data.updateInvoice)
        dispatch(actions.setRenderDelivery(true))

        setInvoiceDeliveryState(reponse)
        handleHideForm()
    }

    const updateInvoice = async (id) => {
        try {
            const response = await axios.put(`${URL_BACKEND}/api/staff/invoices/update/delivery/${id}`, invoiceDeliveryState)
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }

    const updateInvoiceAsync = async (id) => {

        try {
            const response = await axios.put(`${URL_BACKEND}/api/staff/invoices/update/delivery/${invoiceDeliveryState._id}`, invoiceDeliveryState)
            console.log(response.data);
            if (response.data.success) {
                setInvoiceDeliveryState(response.data.updateInvoice)
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }

    return (
        <div className="py-4">
            <h2 className="page-header">
                Delivery detail
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Form onSubmit={handleOnSubmit}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Name Car</td>
                                            <td>{invoiceDeliveryState.car_ID.name}</td>
                                        </tr>
                                        <tr>
                                            <td>License Plates</td>
                                            <td>{invoiceDeliveryState.car_ID.license_plates}</td>
                                        </tr>
                                        <tr>
                                            <td>Cost</td>
                                            <td>
                                                {new Intl.NumberFormat().format(invoiceDeliveryState.car_ID.price)} VND/ngày

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Start Day</td>
                                            <td>{moment(invoiceDeliveryState.start_day).format("MM/DD/YYYY")}</td>
                                        </tr>
                                        <tr>
                                            <td>End Day</td>
                                            <td>{moment(invoiceDeliveryState.end_day).format("MM/DD/YYYY")}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Cost</td>
                                            <td>
                                                {new Intl.NumberFormat().format(daysBetween * invoiceDeliveryState.car_ID.price)} VND
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Customer Name</td>
                                            <td>{invoiceDeliveryState.customer_ID.fullname}</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Phone</td>
                                            <td>{invoiceDeliveryState.customer_ID.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Address</td>
                                            <td>{invoiceDeliveryState.customer_ID.address}</td>
                                        </tr>
                                        <tr>
                                            <td>delivery location</td>
                                            <td>{invoiceDeliveryState.delivery_location}</td>
                                        </tr>

                                        {
                                            route !== "history" && (
                                                <>
                                                    {/* <tr>
                                                        <td>Return location</td>
                                                        <td>{invoiceDeliveryState.returning_location}</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Payment Status</td>
                                                        <td>

                                                            <Badge type={paymentStatus[invoiceDeliveryState.payment_status]} content={invoiceDeliveryState.payment_status} />

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Transportation Status</td>
                                                        <td>
                                                            <select
                                                                name="transportation_status"
                                                                value={transportation_status}
                                                                onChange={onDeliveryUpdate}
                                                                className='hide'
                                                            >
                                                                <option value="DELIVERY_REQUEST">DELIVERY_REQUEST</option>
                                                                <option value="DELIVERING">DELIVERING</option>
                                                                <option value="DELIVERY SUCESSFULL">DELIVERY SUCESSFULL</option>
                                                                <option value="DELIVERY FAIL">DELIVERY FAIL</option>
                                                                <option value="PENDING">PENDING</option>
                                                            </select>
                                                            <span className="span">
                                                                <Badge type={transportationDeliveryStatus[invoiceDeliveryState.transportation_status]} content={invoiceDeliveryState.transportation_status} />
                                                            </span>
                                                        </td>

                                                    </tr>
                                                </>
                                            )
                                        }

                                        <tr>
                                            <td>General Status</td>
                                            <td>
                                                <Badge type={generalStatus[general_status]} content={general_status} />

                                            </td>
                                        </tr>

                                        {children.route === "transportation" &&
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Button variant='success' onClick={handleAcceptDelivery}>Accept</Button>
                                                </td>
                                            </tr>
                                        }

                                        {
                                            children.route === "activity" &&
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Button variant='success' onClick={handleSuccessFullDelivery} className='me-3'>Delivery Successfull</Button>
                                                    <Button variant='danger' onClick={handleFailedDelivery}>Delivery Fail</Button>
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

export default DeliveryDetail