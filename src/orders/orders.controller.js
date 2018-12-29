'use strict'
const dba = require('./orders.dba')
const utils = require('../utils/utils')

const getAll = async (req, res) => {
    try {
        const query = req.query
        if(query.customer_id) return getCustomerOrders(req, res)
        if(query.seller_id) return getSellerOrders(req, res)
        const result = await dba.getAll()
        res.send(result)
    }
    catch (err) {
        res.send({message: err.message})
    }
}
const get = async (req, res) => {
    try {
        const result = await dba.get(data)
        res.send(result)
    }
    catch (err) {
        res.send({message: err.message})
    }
}

const getCustomerOrders = async (req, res) => {
    try {
        const customerId = utils.validateId(req.query.customer_id)
        if( isNaN( customerId ) ) return res.send({message: "Invalid id!"})
        const result = await dba.getCustomerOrders(customerId)
        res.send(result)
    }
    catch(err) {
        res.status(400).send({message:err.message})
    }
}
const getSellerOrders = async (req, res) => {
    try {
        const sellerId = utils.validateId(req.query.seller_id)
        if (isNaN(sellerId)) return res.send({
            message: "Invalid id!"
        })
        const result = await dba.getCustomerOrders(sellerId)
        res.send(result)
    }
    catch(err) {
        res.status(400).send({message:err.message})
    }
}

const create = async (req, res) => {
    try {
        const order = req.body
        const result = await dba.create(order)
        res.send(result)
    }
    catch (err) {
        res.send({message: err.message})
    }
}
const update = async (req, res) => {
    try {
        const result = await dba.update(data)
        res.send(result)
    }
    catch (err) {
        res.send({message: err.message})
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