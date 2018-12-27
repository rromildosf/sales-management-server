const validateId = (id) => {
    return parseInt(id) && !isNaN(id) ? parseInt(id) : NaN
}

/* TODO: Should be added to db */
// To keep sample have two status only
const CUSTOMER_STATUS = {
    "CLEAR": 0, 
    "FROZEN": 1
}

module.exports = {
    validateId,
    CUSTOMER_STATUS
}