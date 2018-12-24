const validateId = (id) => {
    return parseInt(id) && !isNaN(id) ? parseInt(id) : NaN
}

module.exports = {
    validateId
}