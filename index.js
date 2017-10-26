const renderFunctionGenerator = require('./lib/renderFunctionGenerator');

module.exports = function (template, data) {
  const renderFunction = renderFunctionGenerator(template, data, {});
  return renderFunction(data);
}