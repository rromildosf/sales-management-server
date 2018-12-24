const dba = require('../dba/dba')

/**
 * Returns all products
 * @param {boolean} allFields 
 * @param {number} limit (not implemented)
 * @param {number} page pagination, used with limit (not implemented)
 */
const getAll = (allFields, limit, page) => {
    const query = `SELECT ${allFields ? '*' : 'name, description, price, quantity'}
            FROM products`
    return dba.makeQuery(query)
}
/**
 * Return a product identified by id
 * @param {int} id product id
 */
const getProduct = (id) => {
    const query = `SELECT * FROM products WHERE id = ${id}`
    return dba.makeQuery(query)
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
    const prod = parseProduct(product)
    const query = `INSERT INTO products (name, price, quantity, description, commission, barcode, image)
            VALUES ( 
                ${prod.name},
                ${prod.price},
                ${prod.quantity},
                ${prod.description},
                ${prod.commission},
                ${prod.barcode},
                ${prod.image}
            )`
    return dba.makeQuery(query)
}

/**
 * Update one product
 * @param {int} id product id
 * @param {Product} product 
 */
const update = (id, product) => {
    const prod = parseProduct(product)
    
    const query = `UPDATE products 
                SET name=${prod.name},
                    price=${prod.price},
                    quantity=${prod.quantity},
                    description=${prod.description},
                    commission=${prod.commission},
                    barcode=${prod.barcode},
                    image=${prod.image}
                WHERE id = ${id}`
    
    return dba.makeQuery(query)
}

/**
 * Deletes one product of database
 * @param {int} id product id
 */
const remove = (id) => {
    const query = `DELETE FROM products WHERE id = ${id}`

    return dba.makeQuery(query)
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