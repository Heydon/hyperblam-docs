const install = async url => {
  const path = url.substr(0, url.lastIndexOf('/'));
  const undefinedElems = [...document.querySelectorAll(':not(:defined)')];
  const blamElems = undefinedElems.filter(elem => elem.nodeName.includes(`-BLAM`));
  const names = [...new Set(blamElems.map(elem => elem.nodeName.toLowerCase()))];
  const imports = names.map(name => {
    let stem = name.split('-')[0];
    let filename = stem.charAt(0).toUpperCase() + stem.slice(1);
    return import(`${path}/elements/${filename}.js`);
  });
  const defs = await Promise.all(imports);
  defs.forEach(def => {
    let key = Object.keys(def)[0];
    customElements.define(`${key.toLowerCase()}-blam`, def[key]);
  });
  let ready = new CustomEvent('blamready');
  window.dispatchEvent(ready);
}

export { install }