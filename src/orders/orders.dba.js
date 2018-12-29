'use strict'
const assert = require('assert').strict
const dba = require('../dba/dba')
const customerDba = require('../customers/customers.routes')
const sellerDba = require('../sellers/sellers.dba')
const utils = require('../utils/utils')

const create = async (order) => {
    let orderId = undefined
    try {
        const item = parseOrder(order)
        
        /* Select and check products */
        const ids = item.products.map( p => p.id ).join(',')
        const products = await dba.makeQuery(`SELECT id, price, commission 
                                                FROM products WHERE id in (${ids})`)
        if( products.length != item.products.length )
            throw {message: 'Some products are unavailable.'}
        
        /* Check if customer can buy */
        const customer = await customerDba.get(item.customer_id)
        if( customer.status == utils.CUSTOMER_STATUS.FROZEN )
            throw {message: "Customer can't make orders, 'irregular situation'."}


        /* Insert order and get orderId */
        const orderQuery = `
            INSERT INTO orders (customer_id, seller_id, payment_method, 
                                card_flag, installments, paid_installments)
            VALUES (${item.customer_id}, ${item.seller_id}, ${item.payment_method},
                    ${item.card_flag}, ${item.installments}, ${item.paid_installments})`
        
        let res = await dba.makeQuery(orderQuery)
        orderId = res.insertId

        /* Insert order details */
        let productsQuery = `INSERT INTO order_products 
            (product_id, quantity, order_id, observation, price, commission)
            `
        productsQuery += item.products.map(p =>
            `(SELECT id, ${p.quantity}, ${orderId}, ${p.observation}, price, commission
            FROM products WHERE id=${p.id})`).join('UNION ALL ')

        // the 'await' is required to enter on catch in case of error
        return await dba.makeQuery(productsQuery)

    }
    catch(err) {
        /* If success on first query but error on second, delete order */
        if( orderId ){
            await dba.makeQuery(`DELETE FROM orders WHERE id=${orderId}`)
        }
        throw err        
    }
}

const getCustomerOrders = (id, limit, page, date) => {
    return getOrdersFrom('customers', id, 'customer_id', limit, page, date)
}

const getSellerOrders = (id, limit, page, date) => {
    return getOrdersFrom('sellers', id, 'seller_id', limit, page, date)
}

const getOrdersFrom = async (table, id, idName, limit, page, date) => {
    const q = `
        SELECT * FROM orders
        WHERE ${idName}=${id} ORDER BY id` // TODO: limit and date
    let orders = await dba.makeQuery(q)
    if( orders.length == 0 ) return []

    const orderIds = orders.map(order => order.id).join(',')
    const products = await getOrdersProducts( orderIds )
    let productIndex = 0 // used to avoid re-check on same order_product (improves performance)
    orders = orders.map( order => {
        let orderProducts = []
        
        while( productIndex < products.length && products[productIndex].order_id == order.id) {
            const product = products[productIndex++]
            delete product.order_id
            orderProducts.push(product)
        }
        order.products = orderProducts
        return order
    })
    return orders
}

const getOrdersProducts = async (orderIds) => {
    const q = `SELECT * FROM order_products WHERE order_id IN (${orderIds})`
    return dba.makeQuery(q)
}

const getAll = async (limit, page, date) => {
    const query = `
        SELECT O.*, OP.product_id, OP.price, OP.quantity, OP.commission, OP.observation, OP.product_id
        FROM orders as O 
        INNER JOIN order_products as OP ON O.id=OP.order_id`

    let orders = await dba.makeQuery(query)

    const productIds = orders.map( order => order.product_id ).join(',')
    const prodQuery = `SELECT * FROM products WHERE id in (${productIds})`
    const products = await dba.makeQuery(prodQuery)
    const customerIds = orders.map(order => order.customer_id).join(',')
    const customerQuery = `
        SELECT * FROM customers AS C 
        INNER JOIN users AS U ON C.userid=U.id AND C.id IN (${customerIds})`
    const customers = await dba.makeQuery(customerQuery)
    
    orders = orders.map(order => {
        order.products = products.filter(p => order.product_id = p.id)
        delete order.product_id
        order.customer = customers.filter(c => c.id == order.customer_id )
        delete order.customer_id
        return order
    })
    return orders
}
const get = (data) => {
    
}
const update = (item) => {
   
}

const parseOrder = (order) => {
    return {
        created_at: Date.now(),
        seller_id: order.seller_id,
        customer_id: order.customer_id,
        installments: order.installments || 1,
        paid_installments: order.paid_installments || 0,
        payment_method: `'${order.payment_method}'`,
        card_flag: `'${order.card_flag}'`, 
        input_value: order.input_value || 0.0,
        payment_day: order.payment_day || 1, // TODO: Default value should be taken from db
        manual_discount: order.manual_discount || 0.0,
        products: order.products.map(p => parseProduct(p))
    }
}

const parseProduct = (product) => {
    return {
        id: product.id,
        quantity: product.quantity,
        observation: `'${product.observation}'`,
        manual_discount: product.manual_discount || 0.0
    }
}

module.exports = {
    getCustomerOrders,
    getSellerOrders,
    getAll,
    get,
    create,
    update,
}