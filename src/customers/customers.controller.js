const dba = require('./customers.dba')

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
        result = await dba.getAll(req.params.limit, req.params.page)
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
    console.log(req);
    res.send(req)

}

module.exports = {
    create,
    getAll,
    get,
    update,
    remove,
    search
}
