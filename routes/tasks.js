// ROUTES
const express = require('express')
const router = express.Router()

//controllers
const {getAllTasks, getTask, postNewTask, updateTask, deleteTask} = require('../controllers/tasks')


// routes
router.route('/').get(getAllTasks).post(postNewTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router