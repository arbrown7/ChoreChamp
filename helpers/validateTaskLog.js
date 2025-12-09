const validator = require('./validate');

const validateTaskLog = (body, callback) => {
  const rules = {
    taskId: 'required|string',
    completedBy: 'required|string',
    completionDate: 'required|string',
    notes: 'string',
    verified: 'requried|boolean'
  };

  const customMessages = {
    'required.taskId': 'Task ID is required.',
    'required.completedBy': 'Completed by is required.',
    'required.completionDate': 'Completion date is required.',
    'required.verified': 'Verified status is required.'
  };

  validator(body, rules, customMessages, callback);
};

module.exports = validateTaskLog;