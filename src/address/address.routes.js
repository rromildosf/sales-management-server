const router = require('express').Router()
const ctrl = require('./address.controller')

router
    .get('/:id', ctrl.get)
    .post('/', ctrl.create)
    .put('/:id', ctrl.update)
    .delete('/:id', ctrl.remove)

module.exports = router
