const renderFunctionGenerator = require('./lib/renderFunctionGenerator');

module.exports = function (template, data, customFilters={}) {
  const defaultFilters = {
    lowCase: function(string) {
      return string.toLowerCase();
    }
  };
  const filters = Object.assign({}, defaultFilters, customFilters);
  const renderFunction = renderFunctionGenerator(template, data, filters);
  return renderFunction(data, filters);
}