const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const validateUser = require('../helpers/validateUsers');

const getAllUsers = async (req, res) => {
  try {
    const result = await db.getDb().db('ChoreChamp').collection('Users').find();
    result.toArray().then((lists) => {
        res.status(200).json(lists);
    })
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
    const result = await db.getDb().db('ChoreChamp').collection('Users').find({ _id: userId });
    result.toArray().then((lists) => {
        if (!lists[0]) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(lists[0]);
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the user' });
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
            preferredTasks: req.body.preferredTasks,
        };
        const result = await db.getDb().db('ChoreChamp').collection('Users').insertOne(user);   
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json({ error: 'Failed to create the user' });
        }
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
        const result = await db.getDb().db('ChoreChamp').collection('Users').updateOne({ _id: userId }, { $set: user });
        if (result.modifiedCount > 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ error: 'Failed to update the user' });
        }
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
    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: 'Failed to delete the user' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to delete the user' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};