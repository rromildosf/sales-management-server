const dba = require('./users.dba')

const create = async (req, res) => {
    try {
        const user = req.body
        const result = await dba.create(user)
        res.send({
            message: "User created successfully!",
            data: { userId: result.insertId }
        });
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await dba.getAll();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: err.message
        });
    }
}

module.exports = {
    create,
    getAll
}
