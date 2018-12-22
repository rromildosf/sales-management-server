const dba = require('../dba/dba')

/**
 * Returns all products
 * @param {boolean} allFields 
 * @param {number} limit (not implemented)
 * @param {number} page pagination, used with limit (not implemented)
 */
const getAll = (allFields, limit, page) => {
    query = `SELECT ${allFields ? '*' : 'name, description, price, quantity'}
            FROM products`
    return new Promise((res, rej) => {
        dba.query(query, (err, result) => {
            if (err) rej(err)
            else res(result)
        })
    })
}
/**
 * Return a product identified by id
 * @param {int} id product id
 */
const getProduct = (id) => {
    query = `SELECT * FROM products WHERE id = ${id}`
    return makeQuery(query)
}

/**
 * Insert a new record (product) on database
 * @param product 
 * {
 *      name: string,
 *      price: number,
 *      quantity: number,
 *      description: string,
 *      commission: number (as percentage/100, ie. for 20% of commission use 0.2), 
 *      barcode: string, 
 *      image: string
 * }
 */
const create = (product) => {
    prod = parseProduct(product)
    query = `INSERT INTO products (name, price, quantity, description, commission, barcode, image)
            VALUES ( 
                ${prod.name},
                ${prod.price},
                ${prod.quantity},
                ${prod.description},
                ${prod.commission},
                ${prod.barcode},
                ${prod.image}
            )`
    return makeQuery(query)
}

/**
 * Update one product
 * @param {int} id product id
 * @param {Product} product 
 */
const update = (id, product) => {
    prod = parseProduct(product)
    
    query = `UPDATE products 
                SET name=${prod.name},
                    price=${prod.price},
                    quantity=${prod.quantity},
                    description=${prod.description},
                    commission=${prod.commission},
                    barcode=${prod.barcode},
                    image=${prod.image}
                WHERE id = ${id}`
    
    return makeQuery(query)
}

/**
 * Deletes one product of database
 * @param {int} id product id
 */
const remove = (id) => {
    query = `DELETE from products WHERE id = ${id}`

    return makeQuery(query)
}

const makeQuery = ( query ) => {
    return new Promise( (res, rej) => {
        dba.query(query, (err, result) => {
            if(err) rej(err)
            else res(result)
        })
    })
}

const parseProduct = (product) => {
    return {
        name: `'${product.name}'`,
        price: product.price,
        quantity: product.quantity || null,
        description: product.description ? `'${product.description}'` : null,
        commission: product.commission || -1,
        barcode: product.barcode ? `'${product.barcode}'` : null,
        image: product.image ? `'${product.image}'`: null
    }   
}

module.exports = {
    create,
    getAll,
    getProduct,
    update,
    remove
}