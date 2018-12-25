const utils = require('../utils/utils')

const dba = require('./address.dba')
const create = async (req, res) => {
    try {
        const result = await dba.create(req.body);
        res.send({ message: 'Address created successfully!', result });
    }
    catch (err) {
        res.status(400).send({
            message: 'Something wrong occurred, please try again.',
            data: err.message
        });
    }
}

const get = async (req, res) => {
    
    try {
        const id = utils.validateId(req.params.id)
        if (isNaN(id)) throw {
            message: `Invalid id '${req.params.id}', please check and try again!`
        }

        const result = await dba.get(id);
        res.send(result);
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
}

const update = async (req, res) => {
    try {
        const addr = req.body
        const result = await dba.update(addr.id, addr);
        res.send({ message: 'Address updated successfully!' });
    }
    catch (err) {
        res.status(400).send({
            data: err.message
        });
    }
}

const remove = async (req, res) => {
    try {
        const result = await dba.remove(req.body);
        res.send({ message: 'Address removed successfully!' });
    }
    catch (err) {
        res.status(400).send({
            message: 'Something wrong occurred, please try again.',
            data: err.message
        });
    }
}

module.exports = {
    create,
    update,
    remove,
    get
}
