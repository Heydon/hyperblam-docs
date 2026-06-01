import fs from 'fs-jetpack';
import YAML from 'yaml';

const files = fs.find('./api/', { matching: '*.yml' });
const elements = [];

files.forEach(file => {
  const string = fs.read(file);
  const element = YAML.parse(string);
  elements.push(element);
});

const recurse = (element, extendedElements) => {
  if (element.extends) {
    let extendedElement = elements.find(other => other.name === element.extends);
    if (extendedElement) {
      extendedElements.push(extendedElement);
      recurse(extendedElement, extendedElements);
    } 
    return;
  }
}

for (const element of elements) {
  let extendedElements = [];
  recurse(element, extendedElements);
  for (const extendedElement of extendedElements) {
    for (const property in extendedElement) {
      if (!element[property]) {
        element[property] = extendedElement[property];
      } else {
        if (Array.isArray(extendedElement[property])) {
          extendedElement[property].forEach(extendedObject => {
            let originalObject = element[property].find(original => original.name === extendedObject.name);
            if (originalObject) {
              const mergedObject = Object.assign({}, extendedObject, originalObject);
              const index = element[property].indexOf(originalObject);
              element[property].splice(index, 1, mergedObject);
            } else {
              element[property].push(extendedObject);
            }
          });
        }
      }
    }
  }
}

fs.write('./dist/api.json', elements.filter(element => element.defined));