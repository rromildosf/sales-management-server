'use strict'
const dba = require('./orders.dba')

const getAll = async (req, res) => {
    try {
        const result = await dba.getAll(data)
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
    getAll,
    get,
    create,
    update,
}