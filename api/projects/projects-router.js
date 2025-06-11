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

router.post('/', (req, res, next) => {
    const { name, description } = req.body

    if(!name || !description){
        res.status(400).json({
            message: 'missing name or description'})
    }

    Project.insert({ name, description })
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})



module.exports = router;