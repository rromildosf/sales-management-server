const router = require('express').Router()
const ctrl = require('./customers.controller')

/* TODO: Add middleware to check access level */

router
    .get('/', ctrl.getAll)
    .get('/search', ctrl.search)
    .get('/:id', ctrl.get)
    .post('/', ctrl.create)
    .put('/:id', ctrl.update)
    .delete('/:id', ctrl.remove)

module.exports = router