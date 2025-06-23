// Write your "actions" router here!
const express = require('express')
const router = express.Router()

const Project = require('../projects/projects-model')
const Action = require('./actions-model')



router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id', (req, res, next)=> {
    const { id } = req.params

    Action.get(id)
    .then(action => {
        if(!action){
            res.status(404).json({
                message: 'there is no action with this id'
            })
        } else {
            res.json(action)
        }
    })
    .catch(next)
})







module.exports = router