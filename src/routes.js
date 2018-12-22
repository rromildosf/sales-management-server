const router = require('express').Router()

const productsRouter = require('./products/products.routes')

router.use((req, res, next) => {
    console.log('Router on routes')
    next()
})

router.use('/products', productsRouter)

module.exports = router