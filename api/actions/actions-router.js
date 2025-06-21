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







module.exports = router