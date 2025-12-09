const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const validateTaskLog = require('../helpers/validateTaskLog');

// GET /tasklogs
const getAllTaskLogs = async (req, res) => {
  try {
    const result = await db.getDb().db('ChoreChamp').collection('TaskLogs').find();
    result.toArray().then((lists) => {
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task logs' });
  }
};

// GET /tasklogs/:id
const getTaskLogById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task Log ID' });
  }
  try {
    const id = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('TaskLogs').find({ _id: id });
    result.toArray().then((lists) => {
      if (!lists[0]) {
        return res.status(404).json({ error: 'Task log not found' });
      }
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the task log' });
  }
};

// POST /tasklogs
const createTaskLog = async (req, res) => {
  validateTaskLog(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });
      try {
      const taskLog = {
        taskId: req.body.taskId,
        completedBy: req.body.completedBy,
        completionDate: req.body.completionDate ? new Date(req.body.completionDate) : new Date(),
        notes: req.body.notes || '',
        verified: req.body.verified === undefined ? false : req.body.verified,
      };

      const result = await db.getDb().db('ChoreChamp').collection('TaskLogs').insertOne(taskLog);
      if (result.acknowledged) {
        res.status(201).json(result);
      } else {
        res.status(500).json({ error: 'Failed to create the task log' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to create the task log' });
    }
  });
};

// PUT /tasklogs/:id
const updateTaskLogById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task Log ID' });
  }
  validateTaskLog(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });
    try {
      const id = new ObjectId(req.params.id);
      const taskLog = {
        taskId: req.body.taskId,
        completedBy: req.body.completedBy,
        completionDate: req.body.completionDate ? new Date(req.body.completionDate) : undefined,
        notes: req.body.notes,
        verified: req.body.verified,
      };

      Object.keys(taskLog).forEach((k) => taskLog[k] === undefined && delete taskLog[k]);

      const result = await db.getDb().db('ChoreChamp').collection('TaskLogs').updateOne(
        { _id: id },
        { $set: taskLog }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: 'Failed to update the task log' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the task log' });
    }
  });
};

// DELETE /tasklogs/:id
const deleteTaskLogById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task Log ID' });
  }
  try {
    const id = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('TaskLogs').deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: 'Failed to delete the task log' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the task log' });
  }
};

module.exports = {
  getAllTaskLogs,
  getTaskLogById,
  createTaskLog,
  updateTaskLogById,
  deleteTaskLogById,
};