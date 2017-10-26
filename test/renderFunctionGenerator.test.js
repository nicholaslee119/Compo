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

  it('test {if}{/if}', function(){
    const html = render(`<p>hello  {if $flag}{$title} {/if}{$name}!</p>`, {name:'nic', title:'Mr.', flag:false})
    expect(html).toBe('<p>hello  nic!</p>');
  })

  it('test {if}{else}{/if}', function(){
    const html = render(`<p>hello {if $male}{$mr}{else}{$ms}{/if}{$name}!</p>`, {name:'nic', mr:'Mr.', ms:'Ms.', male:true})
    expect(html).toBe('<p>hello Mr.nic!</p>');
  })

  it('test {if}{elseif}{/if}', function(){
    const html = render(`<p>hello {if $sex==='male'}{$mr}{elseif $sex==='female'}{$ms}{/if}{$name}!</p>`, {name:'nic', mr:'Mr.', ms:'Ms.', sex:'homo'})
    expect(html).toBe('<p>hello nic!</p>');
  })
});