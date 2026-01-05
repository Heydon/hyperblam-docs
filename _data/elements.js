const manifest = require('./custom-elements.json');

const getDescribed = members => {
  return members && members.filter(prop => prop.description);
}

const propsOnly = manifest.modules.map(module => {
  const element = module.declarations[0];
  return {
    name : element.name,
    tag: `${element.name.toLowerCase()}-blam`,
    summary: element.summary,
    super: superName,
    props: getDescribed(element.members)
  }
});

module.exports = propsOnly;