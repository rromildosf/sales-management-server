const dba = require('./products.dba')

/* TODO: ALL Improve error handling */

const listAll = ( req, res ) => {
    dba.getAll(true)
    .then( status => {
        res.send( status )
    }, err => {
        res.send({message:'Error on get all products', data:null})
    })
}

const create = ( req, res ) => {
    const product = check(req.body)
    dba.create(product).then( status => {
        res.send({message: 'product created', data: product})
    }, err => {
        res.send({message:'Error on create product', data:null})
    })
    
}


const product = (req, res) => {
    id = validateId(req.params.id)
    if( id == NaN )
        return res.status(400).send({message:'invalid id type'})
    
    dba.getProduct( id )
        .then( product => {
            res.send( product )
        }, err => {
            res.status(400).send({
              message: `Error on get product ${req.params.id}`,
              data: null
            })
        })
}

const update = (req, res) => {
    id = validateId(req.params.id)
    if( id == NaN )
        return res.status(400).send({message:'invalid id type'})
    
    const product = check(req.body)    
    dba.update(id, product).then( status => {
        res.send({message:'product updated', data: product})
    }, err => {
        res.status(400).send({
            message: `Error on update product ${req.params.id}`,
            data: null
        })
    })
}

const remove = (req, res) => {
    id = validateId(req.params.id)
    if( id == NaN )
        return res.status(400).send({message:'invalid id type'})
    
    dba.remove(id).then(result => {
        res.send({message:'product removed'})
    }, err => {
        res.status(400).send({
            message: `Error on remove product ${req.params.id}`,
            data: null
        })
    })
}

const validateId = (id) => {
    id_ = parseInt(id)
    if( id_ && !isNaN(id) )
        return id_
    return NaN
}

const check = (req) => {
    nReq = {}
    for( let i in req ){ // UPDATE **
        if( req[i] == undefined || req[i] == 'undefined' )
            nReq[i] = null
        else nReq[i] = req[i]
    }
    return nReq
}

module.exports = {
    listAll,
    create,
    product,
    update,
    remove
}