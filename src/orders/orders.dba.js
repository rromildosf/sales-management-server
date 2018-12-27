'use strict'
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
            (product_id, **algo_mais_para_erro**, quantity, order_id, observation, price, commission)
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

const getAll = (data) => {
    
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
    getAll,
    get,
    create,
    update,
}