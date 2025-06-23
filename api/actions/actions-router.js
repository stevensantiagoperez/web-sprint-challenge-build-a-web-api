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

router.post('/', async (req, res, next) =>{
    const {project_id, description, notes} = req.body;

    if(!project_id || !description || !notes){
        res.status(400).json({
            message: 'missing required fields!'
        })
    }

    try{
        //check if project_id exists
        const project = await Project.get(project_id)
        if(!project){
            return res.status(400).json({ 
                message: 'invalid project_id' })
        }

        //insert new Action
        const newAction = await Action.insert({project_id, description, notes})
        res.status(201).json(newAction)
    } catch (err){
        next(err)
    }
})







module.exports = router