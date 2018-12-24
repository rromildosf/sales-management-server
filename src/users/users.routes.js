const router = require('express').Router()
const ctrl = require('./users.controller')
router
    .get('/', ctrl.getAll)
    .post('/', ctrl.create)

module.exports = router