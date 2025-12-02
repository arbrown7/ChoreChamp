const validator = require('./validate');

const validateHousehold = (body, callback) => {
  const rules = {
    householdName: 'required|string',
    address: 'string',
    members: 'array',
    joinCode: 'required|string',
    createdBy: 'required|string'
  };

  const customMessages = {
    'required.householdName': 'Household name is required.',
    'required.joinCode': 'Join code is required.',
    'required.createdBy': 'CreatedBy is required.'
  };

  validator(body, rules, customMessages, callback);
};

module.exports = validateHousehold;
