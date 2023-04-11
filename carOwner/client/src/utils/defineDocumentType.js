const defineDocumentType = (documents) => {
    let CIC = null
    let driverLicense = null

    if (documents) {
        documents.forEach(document => {
            if (document.type === 'Citizen Identification Card') {
                CIC = {
                    id: document._id,
                    lincense_ID: document.lincense_ID,
                    date: document.date,
                    status: document.status
                }
            }
    
            if (document.type === 'Driver license') {
                driverLicense = {
                    id: document._id,
                    lincense_ID: document.lincense_ID,
                    date: document.date,
                    status: document.status
                }
            }
        });
    }
    

    return {CIC, driverLicense}
}

export default defineDocumentType