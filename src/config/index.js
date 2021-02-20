const json_errors = require('./errors.json');
const json_env = require('./env.json');

env = function() {
  var node_env = process.env.NODE_ENV || 'development';
  return json_env[node_env];
};

errors = function(errors) {
  return json_errors[errors];
};

module.exports =  {
  env,
  errors,
}
