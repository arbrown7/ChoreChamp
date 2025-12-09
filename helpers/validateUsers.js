const validator = require('./validate');

const validateUser = (body, callback) => {
  const rules = {
    name: 'required|string',
    email: 'required|email',
    houshold: 'string',
    role: 'required|string',
    avatar: 'string',
    points: 'integer',
    preferredTasks: 'array'
  };

  const customMessages = {
    'required.name': 'Name is required.',
    'required.email': 'Email is required.',
    'required.role': 'Role is required.'
  };

  validator(body, rules, customMessages, callback);
};

module.exports = validateUser;