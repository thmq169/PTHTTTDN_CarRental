const Rental_invoice = require("../models/Rental_invoice")

const getRentalPeriod = async function (car_ID) {
    const periodArray = []

    const invoices = await Rental_invoice.find({car_ID})

    invoices.forEach(invoice => {
        periodArray.push([invoice.start_day, invoice.end_day])
    });

    return periodArray
}

module.exports = getRentalPeriod