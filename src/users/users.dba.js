const dba = require('../dba/dba')

const create = (user) => {
    const u = parseUser(user)

    const query = `INSERT INTO users (name, password, uid, email, image, access_level, address)
            VALUES (
                ${u.name}, ${u.password}, ${u.uid}, ${u.email}, 
                ${u.image}, ${u.access_level}, ${u.address}
            )`
    return dba.makeQuery(query)
}

/**
 * Returns {@param limit} results, from limit\*page up to limit\*page+limit-1
 * @param {int} limit quantity of results per query (not implemented)
 * @param {int} page  start point of records, used with limit. If limit=10 and page=5,
 * results are records from 50 to 59 (limit\*page, limit\*page+ limit-1)
 */
const getAll = (limit, page) => {
    const query = `SELECT * FROM users`
    return dba.makeQuery(query)
}

const parseUser = (user) => {
    return {
        name: `'${user.name}'`,
        email: `'${user.email}'`,
        uid: `'${user.email}'`,
        address: parseInt(user.address) && !isNaN(user.address) ? parseInt(user.address): null,
        password: `'${user.password}'`,
        image: `'${user.image}'`,
        address: parseInt(user.address) && !isNaN(user.access_level) ?
                 parseInt(user.access_level) : null
    }
}


module.exports = {
    create,
    getAll
}