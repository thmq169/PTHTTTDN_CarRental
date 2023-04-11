import moment from 'moment'

const formatDate = (documentDate) => {
    const date = new Date(documentDate);

    const formattedDate = moment(date).format('YYYY-MM-DD');

    return formattedDate
}

export default formatDate