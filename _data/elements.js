const manifest = require('./custom-elements.json');
const propsOnly = manifest.modules.map(module => {
  const element = module.declarations[0];
  return {
    name : element.name,
    tag: `${element.name.toLowerCase()}-blam`,
    summary: element.summary,
    props: element.members && element.members.filter(prop => prop.description)
  }
});

console.log(propsOnly[0].props);

module.exports = propsOnly;