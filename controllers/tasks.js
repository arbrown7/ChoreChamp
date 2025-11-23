const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
  try {
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').find();
    result.toArray().then((lists) => {
        res.status(200).json(lists);
    })
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

const getTaskById = async (req, res) => {
    try {
    const taskId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').find({ _id: taskId });
    result.toArray().then((lists) => {
        res.status(200).json(lists[0]);
    })
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the task' });
  }
}

const createTask = async (req, res) => {
    try {
    const task = {
        taskTitle: req.body.taskTitle,
        taskDesc: req.body.taskDesc,
        assignedTo: req.body.assignedTo,
        dueDate: req.body.dueDate,
        status: req.body.status,
        recurrence: req.body.recurrence,
        points: req.body.points,
    };
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').insertOne(task);   
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: 'Failed to create the task' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to create the task' });
    }
}

const updateTaskById = async (req, res) => {
    try {
    const taskId = new ObjectId(req.params.id);
    const task = {
        taskTitle: req.body.taskTitle,
        taskDesc: req.body.taskDesc,
        assignedTo: req.body.assignedTo,
        dueDate: req.body.dueDate,
        status: req.body.status,
        recurrence: req.body.recurrence,
        points: req.body.points,
    };
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').updateOne({ _id: taskId }, { $set: task });
    if (result.modifiedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: 'Failed to update the task' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to update the task' });
    }   
}

const deleteTaskById = async (req, res) => {
    try {
    const taskId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').deleteOne({ _id: taskId });
    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: 'Failed to delete the task' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to delete the task' });
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById
};