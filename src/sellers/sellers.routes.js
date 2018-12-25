const router = require('express').Router()
const ctrl = require('./sellers.controller')

/* TODO: Add middleware to check access level */

router
    .get('/', ctrl.getAll)
    .get('/:id', ctrl.get)
    .post('/', ctrl.create)
    .put('/:id', ctrl.update)
    .delete('/:id', ctrl.remove)

module.exports = router