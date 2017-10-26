const renderFunctionGen = require('../lib/renderFunctionGenerator');
const render = require('../index');

describe('renderFunctionGenerator tests', function(){
  it('should generator a function', function(){
    const renderFun = renderFunctionGen(`<p>hello {$name}</p>`,{name:'nic'}, {});
    expect(typeof renderFun).toBe('function');
  })

  it('should render with simple template', function(){
    const html = render(`<p>hello  {$title} {$name}!</p>`, {name:'nic', title:'Mr.'})
    expect(html).toBe('<p>hello  Mr. nic!</p>');
  })
});