// Write your "projects" router here!
const express = require('express')

const Project = require('./projects-model')
const Action = require('../actions/actions-model')

const {
    checkProjectIdExists
} = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', checkProjectIdExists, (req, res, next) => {
   res.json(req.project)
})

router.post('/', (req, res, next) => {
    const { name, description, completed } = req.body

    if(!name || !description){
        return res.status(400).json({
            message: 'missing name or description'})
    }

    const newProject = {
        name,
        description,
        completed: typeof completed === 'boolean' ? completed : false
    };

    Project.insert(newProject)
    .then(created => {
        res.status(201).json(created)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const { name, description, completed } = req.body

    if(!name || !description || typeof completed !== 'boolean') {
        return res.status(400).json({
            message: 'missing name or description'
        })
    }

    Project.get(id)
    .then(project => {
        if(!project){
            return res.status(404).json({
                message: 'No project with that id found'})
        } 

        return Project.update(id, { name, description, completed })
    .then(updatedProject => {
        if(updatedProject){
            res.json(updatedProject)
        }
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