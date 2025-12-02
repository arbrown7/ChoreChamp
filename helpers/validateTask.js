const validator = require('./validate');

const validateTask = (body, callback) => {
  const rules = {
    taskTitle: 'required|string',
    taskDesc: 'string',
    assignedTo: 'string',
    dueDate: 'date',
    status: 'required|boolean',
    recurrence: 'string',
    points: 'required|numeric'
  };

  const customMessages = {
    'required.taskTitle': 'Task title is required.',
    'required.status': 'Status is required (true/false).',
    'required.points': 'Points value is required.',
  };

  validator(body, rules, customMessages, callback);
};

module.exports = validateTask;
