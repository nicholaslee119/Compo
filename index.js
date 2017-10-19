
module.exports = function (template, data) {
  const html = '';
  const renderFunction = renderFunctionGenerator(template);
  html = renderFunction(data);
  return html;
}