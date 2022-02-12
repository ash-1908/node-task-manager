// CONTROLLERS
//model
const Task = require("../models/tasks");

//middleware
const asyncWrapper = require("../middleware/async");
const {createCustomerError} = require('../errors/custom-error')

// get requests
const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskId } = req.params;
	const task = await Task.findOne({ _id: taskId });
	if (!task) {
		return next(createCustomerError( `No task with id: ${taskId} found`, 404))
	}
	res.status(200).json({ task });
});

// post requests

const postNewTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

// patch requests

const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskId } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!task) {
		return next(createCustomerError( `No task with id: ${taskId} found`, 404))
	}
	res.status(200).json({task});
});

// delete requests

const deleteTask = asyncWrapper(async (req, res,next) => {
	const { id: taskId } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskId });
	if (!task) {
		return next(createCustomerError( `No task with id: ${taskId} found`, 404))
	}
	//res.status(200).json({ task });
	res.status(200).send();
});

// exports
module.exports = {
	getAllTasks,
	getTask,
	deleteTask,
	updateTask,
	postNewTask,
};
