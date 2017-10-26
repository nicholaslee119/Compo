
function parse (template) {
  const templateString = [];
  let beg = 0;
  let len = template.length;
  let stmbeg = 0;
  let stmend = 0;
  let preCode = '';
  let endCode = '';
  let stmJs = '';

  while(beg < len) {
    stmbeg = template.indexOf('{', beg);
    if(stmbeg === -1) {
      endCode = template.substr(beg);
      templateString.push(`html.push('${endCode}');`);
      break;
    }

    stmend = template.indexOf('}', stmbeg);
    if(stmend === -1) {
      break;
    }

    preCode = template.substring(beg, stmbeg);
    if(template.charAt(stmbeg + 1) === '$') {
      templateString.push(`html.push('${preCode.substr(0, preCode.length)}');`);
      stmJs = template.substring(stmbeg + 1, stmend);
      templateString.push(`html.push(${stmJs}.toString());`);
    } else {
      templateString.push(`html.push('${preCode}');`);
      stmJs = template.substring(stmbeg + 1, stmend);
      templateString.push(`${transStm(stmJs)}`);
    }
    beg = stmend + 1;
  }
  return templateString;
}

const regmap = [
  {reg: /^if\s+(.+)/i, val: (all, condition) => {return `if(${condition}) {`;}},
  {reg: /^elseif\s+(.+)/i, val: (all, condition) => {return `} else if(${condition}) {`}},
  {reg: /^else/i, val: '} else {'},
  {reg: /^\/\s*if/i, val: '}'},
  {reg: /^list\s+([\\S]+)\s+as\s+([\S]+)/i, val: (all, arr, item) => {return `for(var __INDEX__=0;__INDEX__<${arr}.length;__INDEX__++) {var ${item}=${arr}[__INDEX__];var ${item}_index=__INDEX__;`;}},
  // {reg: /^\\/\s*list/i, val: '}'},
  {reg: /^var\\s+(.+)/i, val: (all, expr) => {return `var ${expr};`;}},
];

function transStm (stmJs) {
  stmJs = stmJs.trim();
  for(let item of regmap) {
    if (item.reg.test(stmJs)) {
      return (typeof item.val === 'function') ? stmJs.replace(item.reg, item.val) : item.val;
    }
  }
}

module.exports = function (template, data, filters) {

  const functionString = [
    `try { var html = [];`,
    '',
    `return html.join(''); } catch(e) { throw e; }`,
  ];

  const templateString = parse(template);

  const valuesString = [];
  Object.keys(data).forEach((name) => {
    valuesString.push(`var $${name} = DATA['${name}'];`)
  });

  const filtersString = [];
  Object.keys(filters).forEach((name) => {
    filtersString.push(`FILTERS['${name}'] = FILTER['${name}'];`)
  })

  functionString[1] = valuesString.concat(filtersString).concat(templateString).join('');
  return new Function('DATA', 'FILTER', functionString.join(''));
};