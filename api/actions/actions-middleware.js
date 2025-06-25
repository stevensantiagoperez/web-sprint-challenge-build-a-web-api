// add middlewares here related to actions
const Action = require('./actions-model')
const Project = require('../projects/projects-model');


async function checkActionIdExists(req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action) {
            return res.status(400).json({
                message: 'action not found'
            })
        }
        req.action = action;
        next();
    } catch (err){
        next(err)
    }
}

function validateActionBody(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (
    !project_id ||
    !description ||
    !notes ||
    typeof completed !== 'boolean'
  ) {
    return res.status(400).json({
      message: 'missing or invalid required fields'
    });
  }

  next();
}

module.exports = {
    checkActionIdExists,
    validateActionBody,
};
