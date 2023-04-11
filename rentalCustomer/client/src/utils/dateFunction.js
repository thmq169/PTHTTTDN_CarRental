const plusOneDate = (inputDate) => {
    const dateObj = new Date(inputDate);

    dateObj.setDate(dateObj.getDate() + 1);

    return dateObj.toDateString() !== 'Invalid Date' ? dateObj.toDateString() : '';
}

const minusOneDate = (inputDate) => {
    const dateObj = new Date(inputDate);

    dateObj.setDate(dateObj.getDate() - 1);

    return dateObj.toDateString() !== 'Invalid Date' ? dateObj.toDateString() : '';
}

const countDate = (start, end) => {
    if (start == '' || end == '') {
        return 0
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(start);
    const secondDate = new Date(end);

    const diffDays = Math.round((secondDate - firstDate) / oneDay);

    return diffDays + 1
}

const dayInThePast = (inputDate) => {
    const input = new Date(inputDate);
    const now = Date.now()

    return now - input > 0 ? true : false
}

export { plusOneDate, minusOneDate, countDate, dayInThePast }