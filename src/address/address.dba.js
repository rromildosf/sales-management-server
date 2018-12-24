const dba = require('../dba/dba')

const create = (address) => {
    const addr = parseAddress(address)
    const query = `
        INSERT INTO address (city, street, number, district, state, country, complement, reference)
        VALUES (${addr.city}, ${addr.street}, ${addr.number}, ${addr.district},
             ${addr.state}, ${addr.country}, ${addr.complement}, ${addr.reference})`

    return dba.makeQuery(query)
}

const update = (id, address) => {
    const addr = parseAddress(address)
    const query = `
        UPDATE address
        SET city=${addr.city}, 
            street=${addr.street},
            number=${addr.number},
            district=${addr.district},
            state=${addr.state},
            country=${addr.country},
            complement=${addr.complement},
            reference=${addr.reference}
        WHERE id=${id}`
    return dba.makeQuery(query)
}

const remove = (id) => {
    const query = `DELETE FROM products WHERE id=${id}`
    return dba.makeQuery(query)
}

const get = (id) => {
    const query = `SELECT * FROM address WHERE id=${id}`
    return dba.makeQuery(query)
}

const parseAddress = (addr) => {    
    return {
        city: addr.city ? `'${addr.city}'` : null,
        state: addr.state ? `'${addr.state}'` : null,
        number: addr.number || null,
        street: addr.street ? `'${addr.street}'` : null,
        country: addr.country ? `'${addr.country}'` : null,
        district: addr.district ? `'${addr.district}'` : null,
        reference: addr.reference ? `'${addr.reference}'` : null,
        complement: addr.complement ? `'${addr.complement}'` : null,
    }
}

module.exports = {
    create,
    update,
    remove,
    get
}