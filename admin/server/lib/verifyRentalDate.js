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
    var check = Date.parse(dateCheck);

    if ((check <= to && check >= from)){
        return true
    }
    else {
        return false
    }   
}


const verifyRentalDate = async function (day_check, car_ID) {
    const periodArray = await getRentalPeriod(car_ID)

    for (let index = 0; index < periodArray.length; index++) {
        const period = periodArray[index];
        if (checkDateIsBetweenTwoDates(period[0], period[1], day_check)) {
            return false
        }
    }
    return true
}

module.exports = verifyRentalDate