const router = require('express').Router()
const ctrl = require('./products.controller')

/* TODO: Check SQL Injetion */
router
    .get('/', ctrl.listAll) /* TODO: Pagination */
    .get('/:id', ctrl.product) 
    .post('/', ctrl.create)
    .put('/:id', ctrl.update)
    .delete('/:id', ctrl.remove) /* TODO: Remove multiple products at the same time */

module.exports = router