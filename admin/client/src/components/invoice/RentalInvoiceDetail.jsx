import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useReactToPrint } from "react-to-print";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Badge from '../badge/Badge'
import { differenceInDays } from 'date-fns';
import { URL_BACKEND } from '../../store/actions/constants';
import CustomerContract from '../contract/CustomerContract'
import './invoice.css'

const transportationRentalInvoiceStatus = {
    'DELIVERY_REQUEST': "warning",
    'DELIVERING': "primary",
    'DELIVERY SUCESSFULL': "success",
    'DELIVERY FAIL': "danger",
    'RETURNING_REQUEST': "warning",
    'RECEIVING': "primary",
    'RECEIVIE SUCESSFULL': "success",
    'RECEIVIE FAIL': "danger",
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

const rentalStatus = {
    "UNAVAILABLE": "warning",
    "AVAILABLE": "success",
    "STOP_RENTING": "danger"
}

const paymentStatus = {
    'PENDING': "warning",
    '30%': "primary",
    'COMPLETED': "success",
    'UNCOMPLETED': "danger"
}

function RentalInvoiceDetail({ rentalInvoice, handleSetRender }) {

    const [invoiceRental, setInvoiceRental] = useState(rentalInvoice)
    const [carDocument, setCarDocument] = useState([])
    const [rentalDocument, setRentalDocument] = useState([])

    const { start_day, end_day, delivery_location, returning_location, payment_status, transportation_status, general_status } = invoiceRental

    const startDate = new Date(rentalInvoice.start_day);
    const endDate = new Date(rentalInvoice.end_day);
    const daysBetween = differenceInDays(endDate, startDate) + 1;

    const { idInvoice } = useParams()

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

    const onChangeRentUpdate = (e) => {
        setInvoiceRental({ ...invoiceRental, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (general_status === 'PENDING') {
            if (payment_status === "30%" || payment_status === "COMPLETED") {
                setInvoiceRental({ ...invoiceRental, transportation_status: "DELIVERY_REQUEST", general_status: "CONFIRM" })
            }

            if (payment_status === "UNCOMPLETED") {
                setInvoiceRental({ ...invoiceRental, transportation_status: "PENDING", general_status: "CANCEL" })
            }

            if (payment_status === "PENDING" && general_status !== "CANCEL") {
                setInvoiceRental({ ...invoiceRental, transportation_status: "PENDING", general_status: "PENDING" })
            }
        }
    }, [payment_status])

    useEffect(() => {
        axios.get(`${URL_BACKEND}/api/staff/invoices/${idInvoice}`)
            .then(response => response.data)
            .then(data => {
                // console.log("-+++++++++++++++++++++++++", data.car_documents, data.rentalcustomer_documents)
                setCarDocument(data.car_documents)
                setRentalDocument(data.rentalcustomer_documents)
            })
    }, [idInvoice])

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const reponse = await updateInvoice(invoiceRental._id).then((data) => data.updateInvoice)
        const newInvoices = await axios.get(`${URL_BACKEND}/api/staff/invoices/`)

        console.log(newInvoices.data.invoices);
        handleSetRender(newInvoices.data.invoices)
        setInvoiceRental(reponse)
        // console.log(invoiceRental);
        handleHideForm()
    }
    const refComponent = useRef()
    const handlePrint = useReactToPrint({
        content: () => refComponent.current,
        onAfterPrint: () => hideContractArea(),
        documentTitle: "hop-dong",
    })

    const hideContractArea = () => {
        const contractArea = document.getElementById('contractArea')

        contractArea.className = "contract d-none justify-content-center"

    }

    const handlePrintPdf = () => {

        const contractArea = document.getElementById('contractArea')

        contractArea.className = "contract d-flex justify-content-center"

        handlePrint()
    }


    const updateInvoice = async (id) => {
        try {
            const response = await axios.put(`${URL_BACKEND}/api/staff/invoices/update/${id}`, invoiceRental)
            console.log(response.data);
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

    const data = {
        date_contract: "2023-10-04",
        start_day: "2023-04-10",
        end_day: "2023-05-10",
        owner_name: "Nguyen Nhut Huy",
        birth_day: "2002-09-16",
        lincense_ID: "520H0671",
        license_date: "2020-04-12",
        owner_address: "Ho Chi Minh",
        phone: "0987655443",
        car_name: "Honda 4 banh",
        manufacturer_year: 2016,
        license_plates: "85F1 - 41412",
        registration_certificate: "09887177373",
        registration_certificate_date: "2021-07-04",
        inspection_certificate: "823748547",
        inspection_certificate_date: "2021-02-28"
    }

    console.log({ invoiceRental, carDocument, rentalDocument })

    return (
        <div>
            <h2 className="page-header position-relative">
                Rental Invoice detail
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Form onSubmit={handleOnSubmit}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Invoice ID</td>
                                            <td>
                                                {rentalInvoice._id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Name Car</td>
                                            <td>
                                                {rentalInvoice.car_ID.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>License Plates</td>
                                            <td> {rentalInvoice.car_ID.license_plates} </td>
                                        </tr>
                                        <tr>
                                            <td>Cost</td>
                                            <td> {new Intl.NumberFormat().format(rentalInvoice.car_ID.price)} VND </td>
                                        </tr>
                                        <tr>
                                            <td>Start Day</td>
                                            <td>
                                                <input onChange={onChangeRentUpdate} className='hide' type="date" name="start_day" value={start_day} id="" />
                                                <span className='span'>{moment(start_day).format("MM/DD/YYYY")}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>End Day</td>
                                            <td>

                                                <input onChange={onChangeRentUpdate} className='hide' type="date" name="end_day" value={end_day} id="" />
                                                <span className='span'>{moment(end_day).format("MM/DD/YYYY")}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Cost</td>
                                            <td>{new Intl.NumberFormat().format(daysBetween * rentalInvoice.car_ID.price)} VND</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Name</td>
                                            <td>{rentalInvoice.customer_ID.fullname}</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Phone</td>
                                            <td>{rentalInvoice.customer_ID.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Customer Address</td>
                                            <td>{rentalInvoice.customer_ID.address}</td>
                                        </tr>
                                        <tr>
                                            <td>delivery location</td>
                                            <td>
                                                <input onChange={onChangeRentUpdate} className='w-100 hide' type="text" name="delivery_location" value={delivery_location} id="" />
                                                <span className='span'>{delivery_location}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Return location</td>
                                            <td>
                                                <input onChange={onChangeRentUpdate} className='w-100 hide' type="text" name="returning_location" value={returning_location} id="" />
                                                <span className='span'>{returning_location}</span>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td>Rental Status Car</td>
                                            <td>
                                                <Badge type={rentalStatus[rentalInvoice.car_ID.rental_status]} content={rentalInvoice.car_ID.rental_status} />
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <td>Payment Status</td>
                                            <td>
                                                <select
                                                    name="payment_status"
                                                    value={payment_status}
                                                    className='hide'
                                                    onChange={onChangeRentUpdate}
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="COMPLETED">COMPLETED</option>
                                                    <option value="UNCOMPLETED">UNCOMPLETED</option>
                                                    <option value="30%">30%</option>
                                                </select>
                                                <span className="span">
                                                    <Badge type={paymentStatus[payment_status]} content={payment_status} />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Transportation Status</td>
                                            <td>
                                                <select
                                                    name="transportation_status"
                                                    value={transportation_status}
                                                    onChange={onChangeRentUpdate}
                                                    className='hide'
                                                >
                                                    <option value="DELIVERY_REQUEST">DELIVERY_REQUEST</option>
                                                    <option value="DELIVERING">DELIVERING</option>
                                                    <option value="DELIVERY SUCESSFULL">DELIVERY SUCESSFULL</option>
                                                    <option value="DELIVERY FAIL">DELIVERY FAIL</option>
                                                    <option value="RETURNING_REQUEST">RETURNING REQUEST</option>
                                                    <option value="RECEIVING">RECEIVING</option>
                                                    <option value="RECEIVIE SUCESSFULL">RECEIVIE SUCESSFULL</option>
                                                    <option value="RECEIVIE FAIL">RECEIVIE FAIL</option>
                                                    <option value="PENDING">PENDING</option>
                                                </select>
                                                <span className="span">
                                                    <Badge type={transportationRentalInvoiceStatus[transportation_status]} content={transportation_status} />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>General Status</td>
                                            <td>
                                                <select
                                                    name="general_status"
                                                    value={general_status}
                                                    onChange={onChangeRentUpdate}
                                                    className='hide'
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="CONFIRM">CONFIRM</option>
                                                    <option value="CANCEL">CANCEL</option>
                                                    <option value="BREACH">BREACH</option>
                                                    <option value="IN CONTRACT">IN CONTRACT</option>
                                                    {/* <option value="null">PENDING</option>z */}
                                                </select>
                                                <span className="span">
                                                    <Badge type={generalStatus[general_status]} content={general_status} />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>

                                            <td></td>
                                            <td>
                                                <Button variant='success' onClick={handleShowForm} className='me-3'>Edit</Button>
                                                <Button variant='success' type='submit' className='me-3'>Submit</Button>
                                                {/* <Button variant='warning' className='btn-print' onClick={handlePrint}>Print</Button> */}
                                                <Button variant='warning' className='btn-print' onClick={handlePrintPdf}>Print</Button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="contractArea" className={`contract d-none justify-content-center`} ref={refComponent} >
                <CustomerContract data={{ invoiceRental, carDocument, rentalDocument }} />
            </div>

        </div>
    )
}

export default RentalInvoiceDetail