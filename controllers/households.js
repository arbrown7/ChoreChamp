const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const validateHousehold = require('../helpers/validateHousehold');

const getAllHouseholds = async (req, res) => {
  try {
    const result = await db.getDb().db('ChoreChamp').collection('Households').find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch households' });
  }
};

const getHouseholdById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Household ID' });
  }

  try {
    const householdId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Households').find({ _id: householdId });
    const lists = await result.toArray();
    if (!lists[0]) return res.status(404).json({ error: 'Household not found' });
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the household' });
  }
};

const getUsersForHousehold = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Household ID' });
  }

  try {
    const householdId = req.params.id;
    const users = await db
      .getDb()
      .db('ChoreChamp')
      .collection('Users')
      .find({ houseHold: householdId })
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users for household' });
  }
};

const createHousehold = async (req, res) => {
  validateHousehold(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });

    try {
      const household = {
        householdName: req.body.householdName,
        address: req.body.address,
        members: req.body.members,
        joinCode: req.body.joinCode,
        createdBy: req.body.createdBy,
      };

      const result = await db.getDb().db('ChoreChamp').collection('Households').insertOne(household);
      if (result.acknowledged) res.status(201).json(result);
      else res.status(500).json({ error: 'Failed to create the household' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create the household' });
    }
  });
};

const updateHouseholdById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Household ID' });
  }

  validateHousehold(req.body, async (err, success) => {
    if (!success) return res.status(422).json({ success: false, errors: err });

    try {
      const householdId = new ObjectId(req.params.id);
      const household = {
        householdName: req.body.householdName,
        address: req.body.address,
        members: req.body.members,
        joinCode: req.body.joinCode,
        createdBy: req.body.createdBy,
      };

      const result = await db.getDb().db('ChoreChamp').collection('Households').updateOne(
        { _id: householdId },
        { $set: household }
      );

      if (result.modifiedCount > 0) res.status(200).json(result);
      else res.status(404).json({ error: 'Household not found or no changes' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the household' });
    }
  });
};

const deleteHouseholdById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid Household ID' });
  }

  try {
    const householdId = new ObjectId(req.params.id);
    const result = await db.getDb().db('ChoreChamp').collection('Households').deleteOne({ _id: householdId });
    if (result.deletedCount > 0) res.status(200).json(result);
    else res.status(404).json({ error: 'Household not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the household' });
  }
};

module.exports = {
  getAllHouseholds,
  getHouseholdById,
  getUsersForHousehold,
  createHousehold,
  updateHouseholdById,
  deleteHouseholdById
};
