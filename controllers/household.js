const Household = require('../models/Household');
const mongoose = require('mongoose');

exports.getHousehold = (req, res) => {
    const householdName = req.params.householdNameame;
    Household.find({ name: name })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Not found household with name: ' + householdName });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving theme with name=' + householdName,
          error: err
        });
      });
  };
