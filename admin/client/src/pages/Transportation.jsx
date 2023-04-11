import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { URL_BACKEND } from '../store/actions/constants';
import { useStore, actions } from '../store';
import ListTransportation from '../components/transportation/ListTransportation';

import moment from 'moment';

function Transportation({ route }) {
    const [state, dispatch] = useStore()
    const [invoices, setInvoices] = useState([])
    let body
    const filterInvoices = (listInvoices, string) => {
        return listInvoices.filter(rental => rental.transportation_status.toLowerCase() === string)
    }

    const isDeliveryDate = (dateStart) => {
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

    const isRecieveDate = (dateStart) => {
        const now = Date.now()

        // -1 
        var dateReceive = new Date(dateStart);
        dateReceive.setDate(dateReceive.getDate() + 1);

        const checkDate = moment(now).isSame(dateReceive, 'day')
        const checkMonth = moment(now).isSame(dateReceive, 'month')
        const checkYear = moment(now).isSame(dateReceive, 'year')

        console.log(checkDate, checkMonth, checkYear)

        return checkDate && checkMonth && checkYear

    }

    if (route === "/transportation") {
        let transporDelivery = filterInvoices(invoices, "delivery_request")
        let transporReceive = filterInvoices(invoices, "returning_request")

        transporDelivery = transporDelivery.filter((invoice) => {
            return isDeliveryDate(invoice.start_day)
        })

        transporReceive = transporReceive.filter((invoice) => {
            return isRecieveDate(invoice.end_day)
        })

        console.log("Trans", transporDelivery, transporReceive);
        body = (<ListTransportation
            deliveries={transporDelivery}
            receives={transporReceive}
            route="transportation"
        />)
    }

    if (route === "/activity") {
        let activityDelivery = filterInvoices(invoices, "delivering")

        let activityReceive = filterInvoices(invoices, "receiving")

        activityDelivery = activityDelivery.filter((invoice) => {
            return isDeliveryDate(invoice.start_day)
        })

        activityDelivery = activityDelivery.filter((invoice) => {
            if (invoice.staff_delivery_ID === null) {
                return false
            }
            return invoice.staff_delivery_ID._id == localStorage.getItem("idStaff")
        })

        activityReceive = activityReceive.filter((invoice) => {
            return isRecieveDate(invoice.end_day)
        })

        activityReceive = activityReceive.filter((invoice) => {
            if (invoice.staff_receive_ID === null) {
                return false
            }
            return invoice.staff_receive_ID._id == localStorage.getItem("idStaff")
        })

        console.log("Activity ", activityDelivery, activityReceive);
        body = (<ListTransportation
            deliveries={activityDelivery}
            receives={activityReceive}
            route="activity"
        />)
    }

    if (route === "/history") {
        let historyDelivery
        // = filterInvoices(invoices, "delivery sucessfull")

        let historyReceive
        // = filterInvoices(invoices, "receivie sucessfull")

        historyDelivery = invoices.filter((invoice) => {
            // if (invoice.staff_delivery_ID === null) {

            //     return false
            // }
            // console.log(invoice.staff_delivery_ID)
            try {
                return invoice.staff_delivery_ID._id == localStorage.getItem("idStaff")
            } catch {
                return false
            }
        })

        historyReceive = invoices.filter((invoice) => {
            try {
                return invoice.staff_receive_ID._id == localStorage.getItem("idStaff")
            } catch {
                return false
            }
        })

        console.log("history ", historyDelivery, historyReceive);
        body = (<ListTransportation
            deliveries={historyDelivery}
            receives={historyReceive}
            route="history"
        />)
    }

    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/invoices")
            .then((response) =>
                response.data
            ).then(data => {
                // dispatch(actions.setInvoices(data.invoices))
                // console.log(data.invoices);
                setInvoices(data.invoices)
            })

    }, [])

    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/invoices")
            .then((response) =>
                response.data
            ).then(data => {
                setInvoices(data.invoices)
            })
        dispatch(actions.setRenderDelivery(false))
    }, [state.render_delivery === true])

    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/invoices")
            .then((response) =>
                response.data
            ).then(data => {
                setInvoices(data.invoices)
            })
        dispatch(actions.setRenderReceive(false))
        console.warn(state.render_receive);
    }, [state.render_receive === true])


    return (
        <>
            {body}
        </>
    )
}

export default Transportation