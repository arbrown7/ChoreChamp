const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const validateTaskLog = require('../helpers/validateTaskLog');

// GET /tasklogs
const getAllTaskLogs = async (req, res) => {
  try {
    const result = await db
      .getDb()
      .db('ChoreChamp')
      .collection('TaskLogs')
      .find();
    const lists = await result.toArray();
    res.status(200).json(lists);
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
    const taskLogId = new ObjectId(req.params.id);
    const result = await db
      .getDb()
      .db('ChoreChamp')
      .collection('TaskLogs')
      .findOne({ _id: taskLogId });

    if (!result) return res.status(404).json({ error: 'Task log not found' });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task log' });
  }
};

// POST /tasklogs
const createTaskLog = async (req, res) => {
  validateTaskLog(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });

    try {
      if (!ObjectId.isValid(req.body.taskId)) {
        return res.status(400).json({ error: 'Invalid Task ID' });
      }

      const taskExists = await db
        .getDb()
        .db('ChoreChamp')
        .collection('Tasks')
        .findOne({ _id: new ObjectId(req.body.taskId) });

      if (!taskExists) {
        return res.status(400).json({ error: 'Task does not exist' });
      }

      const taskLog = {
        taskId: req.body.taskId,
        completedBy: req.body.completedBy,
        completionDate: req.body.completionDate
          ? new Date(req.body.completionDate)
          : new Date(),
        notes: req.body.notes || '',
        verified: req.body.verified ?? false
      };

      const result = await db
        .getDb()
        .db('ChoreChamp')
        .collection('TaskLogs')
        .insertOne(taskLog);

      if (result.acknowledged) res.status(201).json(result);
      else res.status(500).json({ error: 'Failed to create task log' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create task log' });
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
      const taskLogId = new ObjectId(req.params.id);

      const taskLog = {
        taskId: req.body.taskId,
        completedBy: req.body.completedBy,
        completionDate: req.body.completionDate
          ? new Date(req.body.completionDate)
          : undefined,
        notes: req.body.notes,
        verified: req.body.verified
      };

      Object.keys(taskLog).forEach(
        key => taskLog[key] === undefined && delete taskLog[key]
      );

      const result = await db
        .getDb()
        .db('ChoreChamp')
        .collection('TaskLogs')
        .updateOne({ _id: taskLogId }, { $set: taskLog });

      if (result.matchedCount === 0)
        return res.status(404).json({ error: 'Task log not found' });

      if (result.modifiedCount === 0)
        return res.status(400).json({ error: 'No changes made' });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task log' });
    }
  });
};

// DELETE /tasklogs/:id
const deleteTaskLogById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Task Log ID' });
  }

  try {
    const taskLogId = new ObjectId(req.params.id);
    const result = await db
      .getDb()
      .db('ChoreChamp')
      .collection('TaskLogs')
      .deleteOne({ _id: taskLogId });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: 'Task log not found' });

    res.status(200).json({ message: 'Task log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task log' });
  }
};

module.exports = {
  getAllTaskLogs,
  getTaskLogById,
  createTaskLog,
  updateTaskLogById,
  deleteTaskLogById
};