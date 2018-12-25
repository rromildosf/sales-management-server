const dba = require('../dba/dba')
const usersDba = require('../users/users.dba')

const create = async (data) => {
    const customer = parseCustomer(data)
    const res = await usersDba.create(data)
    console.log(res);
    
    const query = `INSERT INTO customers (status, userid)
                    VALUES (${customer.status}, ${res.insertId})`
    return dba.makeQuery(query)
}
const getAll = (limit, page) => {
    const query = `
        SELECT  C.*, U.name, U.email, U.uid, U.image, 
            A.id as addressId, A.city, A.street, A.number, 
            A.district, A.country, A.complement, A.reference

        FROM ((customers as C
            INNER JOIN users as U ON C.userid = U.id)
            INNER JOIN address as A ON U.address = A.id)
            `
    return dba.makeQuery(query)
}
const get = (data) => {
    const query = `SELECT * FROM customers`
    return dba.makeQuery(query)
}
const update = (data) => {
    const query = ``
    return dba.makeQuery(query)
}
const remove = (data) => {
    const query = ``
    return dba.makeQuery(query)
}

const parseCustomer = (data) => {
    const user = usersDba.parseUser(data)
    user.status = "'CLEAR'" // TODO: define status codes
    return user
}

module.exports = {
    create,
    getAll,
    get,
    update,
    remove,
}