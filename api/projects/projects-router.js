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

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const { name, description } = req.body

    if(!name || !description) {
        res.status(400).json({
            message: 'missing name or description'
        })
    }

    Project.get(id)
    .then(project => {
        if(!project){
            res.status(404).json({
                message: 'No project with that id found'})
        } 

        return Project.update(id, { name, description })
    .then(updatedProject => {
        res.json(updatedProject)
    })
    .catch(next)
    })
})

router.delete('/:id', async (req, res, next) => {
    try{
        const deleted = await Project.remove(req.params.id)

        if(!deleted){
            res.status(404).json({
                message: 'no project with that id'
            })
        }
        res.json({ message: 'Project deleted successfully' })

    } catch (err){
        next(err)
    }
})

router.get('/:id/actions', async (req, res, next) => {
    try{
        const result = await Project.getProjectActions(req.params.id)

        if(!result){
            res.status(404).json({
                message: 'no project with that id'
            })
        }

        res.json(result)

    } catch(err){
        next(err)
    }
})

module.exports = router;