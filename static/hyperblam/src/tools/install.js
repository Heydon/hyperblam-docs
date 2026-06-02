const install = async url => {
  const path = url.substr(0, url.lastIndexOf('/'));
  const undefinedElements = [...document.querySelectorAll(':not(:defined)')];
  const blamElements = undefinedElements.filter(elem => elem.nodeName.includes(`-BLAM`));
  const uniqueNames = [...new Set(blamElements.map(elem => elem.nodeName.toLowerCase()))];
  for (const name of uniqueNames) {
    let stem = name.split('-')[0];
    let filename = stem.charAt(0).toUpperCase() + stem.slice(1);
    await import(`${path}/elements/${filename}.js`);
  }
  let ready = new CustomEvent('blamready');
  window.dispatchEvent(ready);
}

export { install }