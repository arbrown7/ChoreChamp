const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const validateUser = require('../helpers/validateUsers');

const getAllUsers = async (req, res) => {
  try {
    const result = await db.getDb().db('ChoreChamp').collection('Users').find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Users').findOne({ _id: userId });
    if (!result) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the user' });
  }
};

const getTasksForUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }

  try {
    const userId = req.params.id;
    const tasks = await db
      .getDb()
      .db('ChoreChamp')
      .collection('Tasks')
      .find({ assignedTo: userId })
      .toArray();

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks for user' });
  }
};

const createUser = async (req, res) => {
  validateUser(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });

    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        houseHold: req.body.houseHold,
        role: req.body.role,
        avatar: req.body.avatar,
        points: req.body.points,
        preferredTasks: req.body.preferredTasks
      };
      const result = await db.getDb().db('ChoreChamp').collection('Users').insertOne(user);
      if (result.acknowledged) res.status(201).json(result);
      else res.status(500).json({ error: 'Failed to create the user' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create the user' });
    }
  });
};

const updateUserById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }

  validateUser(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });
    try {
      const userId = new ObjectId(req.params.id);
      const user = {
        name: req.body.name,
        email: req.body.email,
        houseHold: req.body.houseHold,
        role: req.body.role,
        avatar: req.body.avatar,
        points: req.body.points,
        preferredTasks: req.body.preferredTasks
      };

      const result = await db.getDb().db('ChoreChamp').collection('Users').updateOne(
        { _id: userId },
        { $set: user }
      );

      if (result.matchedCount === 0) return res.status(404).json({ error: 'User not found' });
      if (result.modifiedCount === 0) return res.status(400).json({ error: 'No changes made' });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the user' });
    }
  });
};

const deleteUserById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Users').deleteOne({ _id: userId });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getTasksForUser
};