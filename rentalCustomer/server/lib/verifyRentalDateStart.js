const getRentalPeriod = require('./getRentalPeriod')

function addOneDay(date) {
    const dateObj = new Date(date);

    dateObj.setDate(dateObj.getDate() + 1);

    return dateObj.toDateString();
}

function minusOneDay(date) {
    const dateObj = new Date(date);

    dateObj.setDate(dateObj.getDate() - 1);

    return dateObj.toDateString();
}

const checkDateIsBetweenTwoDates = function (dateFrom, dateTo, dateCheck) {
    var from = Date.parse(minusOneDay(dateFrom));
    var to = Date.parse(addOneDay(dateTo));

    var check = Date.parse(new Date(dateCheck).toDateString());

    console.log(to, "---" , check)

    if ((check <= to && check >= from)) {
        return true
    }
    else {
        return false
    }
}

const verifyRentalDateStart = async function (day_check, car_ID) {
    const periodArray = await getRentalPeriod(car_ID)

    for (let index = 0; index < periodArray.length; index++) {
        const period = periodArray[index];
        if (checkDateIsBetweenTwoDates(period[0], period[1], day_check)) {
            return false
        }
    }

    return true
}

const verifyRentalPeriod = async function (day_start, day_end, car_ID) {
    const unavailableDateSet = new Set()

    var end = new Date(day_end);
    for (var d = new Date(day_start); d <= end; d.setDate(d.getDate() + 1)) {
        const dayItem = new Date(d);
        if (!await verifyRentalDateStart(dayItem.toDateString(), car_ID)) {
            unavailableDateSet.add(dayItem.toDateString())
        }
    }

    const unavailableDate = [...unavailableDateSet]

    return unavailableDate
}

module.exports = { verifyRentalDateStart, verifyRentalPeriod }