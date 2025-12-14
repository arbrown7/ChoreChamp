const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const validateTask = require('../helpers/validateTask');

const getAllTasks = async (req, res) => {
  try {
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const getTaskById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task ID' });
  }

  try {
    const taskId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').findOne({ _id: taskId });

    if (!result) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the task' });
  }
};

const createTask = async (req, res) => {
  validateTask(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });

    try {
      const task = {
        taskTitle: req.body.taskTitle,
        taskDesc: req.body.taskDesc,
        assignedTo: req.body.assignedTo,
        dueDate: req.body.dueDate,
        status: req.body.status,
        recurrence: req.body.recurrence,
        points: req.body.points
      };

      const result = await db.getDb().db('ChoreChamp').collection('Tasks').insertOne(task);
      if (result.acknowledged) res.status(201).json(result);
      else res.status(500).json({ error: 'Failed to create the task' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create the task' });
    }
  });
};

const updateTaskById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task ID' });
  }

  validateTask(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });

    try {
      const taskId = new ObjectId(req.params.id);
      const task = {
        taskTitle: req.body.taskTitle,
        taskDesc: req.body.taskDesc,
        assignedTo: req.body.assignedTo,
        dueDate: req.body.dueDate,
        status: req.body.status,
        recurrence: req.body.recurrence,
        points: req.body.points
      };

      const result = await db.getDb().db('ChoreChamp').collection('Tasks').updateOne(
        { _id: taskId },
        { $set: task }
      );

      if (result.matchedCount === 0) return res.status(404).json({ error: 'Task not found' });
      if (result.modifiedCount === 0) return res.status(400).json({ error: 'No changes made' });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the task' });
    }
  });
};

const deleteTaskById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task ID' });
  }

  try {
    const taskId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Tasks').deleteOne({ _id: taskId });

    if (result.deletedCount === 0) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the task' });
  }
};

const getTaskLogsForTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task ID' });
  }

  try {
    const taskId = req.params.id;
    const logs = await db
      .getDb()
      .db('ChoreChamp')
      .collection('TaskLogs')
      .find({ taskId })
      .toArray();

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task logs for task' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  getTaskLogsForTask
};
