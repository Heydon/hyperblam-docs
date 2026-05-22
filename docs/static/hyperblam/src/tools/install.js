const install = async url => {
  const path = url.substr(0, url.lastIndexOf('/'));
  const undefinedElements = [...document.querySelectorAll(':not(:defined)')];
  const blamElements = undefinedElements.filter(elem => elem.nodeName.includes(`-BLAM`));
  const uniqueNames = [...new Set(blamElements.map(elem => elem.nodeName.toLowerCase()))];
  for (const name of uniqueNames) {
    await import(`${path}/elements/${name.split('-')[0]}.js`);
  }
  let ready = new CustomEvent('blamready');
  window.dispatchEvent(ready);
}

export { install }