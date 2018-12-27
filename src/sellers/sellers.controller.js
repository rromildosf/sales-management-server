const dba = require('./sellers.dba')

const create = async (req, res) => {
    try {
        result = await dba.create(req.body)
        res.send(result)
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

const getAll = async (req, res) => {
    try {
        const limit = req.query.limit
        const page = req.query.page
        const result = await dba.getAll(limit, page)
        res.send(result)
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

const get = async (req, res) => {

    try {
        result = await dba.get()
        res.send(result)
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

const update = async (req, res) => {

    try {
        result = await dba.update(data)
        res.send(result)
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

const remove = async (req, res) => {

    try {
        result = await dba.remove(data)
        res.send(result)
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

const search = async (req, res) => {
    query = req.query

}

module.exports = {
    create,
    getAll,
    get,
    update,
    remove,
    search
}