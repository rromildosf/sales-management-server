const router = require('express').Router()

const productsRouter = require('./products/products.routes')
const usersRouter = require('./users/users.routes')
const addrsRouter = require('./address/address.routes')
const customersRouter = require('./customers/customers.routes')
const sellersRouter = require('./sellers/sellers.routes')
const ordersRouter = require('./orders/orders.routes')

router.use((req, res, next) => {
    console.log('Router on routes')
    next()
})

router
    .use('/orders', ordersRouter)
    .use('/products', productsRouter)
    .use('/customers', customersRouter)
    .use('/sellers', sellersRouter)
    .use('/users', usersRouter)
    .use('/addresses', addrsRouter)

module.exports = router