'use strict'
const router = require('express').Router()
const ctrl = require('./orders.controller')

router
    .get('/', ctrl.getAll)
    .get('/:id', ctrl.get)
    .post('/', ctrl.create)
    .put('/:id', ctrl.update)

module.exports = router