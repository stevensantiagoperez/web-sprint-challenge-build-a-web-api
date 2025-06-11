// Write your "projects" router here!
const express = require('express')

const Project = require('./projects-model')
const Action = require('../actions/actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
   const { id } = req.params

   Project.get(id)
   .then(project => {
    if(!project){
        res.status(404).json({
            message: 'no project found with that ID'
        })
    } else {
        res.json(project)
    }
   })
   .catch(next)
})

module.exports = router;