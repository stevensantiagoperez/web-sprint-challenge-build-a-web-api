// add middlewares here related to projects
const Project = require('./projects-model');

async function checkProjectIdExists(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'project not found' });
    }
    req.project = project; // Optional: attach to req for later use
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkProjectIdExists }