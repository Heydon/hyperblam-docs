const manifest = require('./custom-elements.json');
const propsOnly = manifest.modules.map(module => {
  const element = module.declarations[0];
  return {
    name : element.name,
    props: element.members && element.members.filter(prop => prop.description)
  }
});

console.debug(propsOnly);