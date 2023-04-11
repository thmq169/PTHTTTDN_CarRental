import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import ListRentalInvoice from '../components/invoice/ListRentalInvoice'
import RentalInvoiceDetail from '../components/invoice/RentalInvoiceDetail';
import { useStore, actions } from "../store";
import { URL_BACKEND } from '../store/actions/constants';

function RentalInvoice() {
    const [state, dispatch] = useStore()
    const [rentalInvoices, setRentalInvoices] = useState([])

    const { idInvoice } = useParams();

    let body

    body = (<ListRentalInvoice
        rentalInvoices={rentalInvoices}
    />)

    const handleSetRender = (newRentalInvoice) => {
        setRentalInvoices(newRentalInvoice)
    }

    if (idInvoice) {
        const rentalInvoice = rentalInvoices.find(rent => rent._id === idInvoice)
        console.log(rentalInvoice);
        body = (<RentalInvoiceDetail
            rentalInvoice={rentalInvoice}
            handleSetRender={handleSetRender}
        />)
    }



    // console.log(rentalInvoices);
    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/invoices")
            .then((response) =>
                response.data
            ).then(data => {
                dispatch(actions.setInvoices(data.invoices))
                setRentalInvoices(data.invoices)
            })
    }, [])

    return (
        <div>
            {body}
        </div>
    )
}

export default RentalInvoice