const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const getAllHouseholds = async (req, res) => {
  try {
    const result = await db.getDb().db('ChoreChamp').collection('Households').find();
    result.toArray().then((lists) => {
        res.status(200).json(lists);
    })
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch households' });
  }
}

const getHouseholdById = async (req, res) => {
    try {
    const householdId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Households').find({ _id: householdId });
    result.toArray().then((lists) => {
        res.status(200).json(lists[0]);
    })
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the household' });
  }
}

const createHousehold = async (req, res) => {
    try {
    const household = {
        householdName: req.body.householdName,
        address: req.body.address,
        members: req.body.members,
        joinCode: req.body.joinCode,
        createdBy: req.body.createdBy,
    };
    const result = await db.getDb().db('ChoreChamp').collection('Households').insertOne(household);   
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: 'Failed to create the household' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to create the household' });
    }
}

const updateHouseholdById = async (req, res) => {
    try {
    const householdId = new ObjectId(req.params.id);
    const household = {
      householdName: req.body.householdName,
      address: req.body.address,
      members: req.body.members,
      joinCode: req.body.joinCode,
      createdBy: req.body.createdBy,
    };
    const result = await db.getDb().db('ChoreChamp').collection('Households').updateOne({ _id: householdId }, { $set: household });
    if (result.modifiedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: 'Failed to update the household' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to update the household' });
    }   
}

const deleteHouseholdById = async (req, res) => {
    try {
    const householdId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Households').deleteOne({ _id: householdId });
    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: 'Failed to delete the household' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to delete the household' });
    }
}

module.exports = {
    getAllHouseholds,
    getHouseholdById,
    createHousehold,
    updateHouseholdById,
    deleteHouseholdById
};