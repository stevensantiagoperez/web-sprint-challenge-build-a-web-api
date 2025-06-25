// add middlewares here related to actions
const Action = require('./actions-model')
const Project = require('../projects/projects-model');


async function checkActionIdExists(req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action) {
            return res.status(404).json({
                message: 'action not found'
            })
        }
        req.action = action;
        next();
    } catch (err){
        next(err)
    }
}

module.exports = {
    checkActionIdExists,
};
