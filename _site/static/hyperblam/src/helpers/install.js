export const install = async url => {
  const path = url.substr(0, url.lastIndexOf('/'));
  const undefinedElements = [...document.querySelectorAll(':not(:defined)')];
  const blamElements = undefinedElements.filter(elem => elem.nodeName.toLowerCase().includes(`-blam`));
  const blamNames = [...new Set(blamElements.map(elem => elem.nodeName.split('-')[0].toLowerCase()))];
  for (const name of blamNames) {
    await import(`${path}/elements/${name}.js`).catch(_ => {
      console.warn(`<${name}-blam> is not a HYPERBLAM element`);
    });
  }
  let ready = new CustomEvent('blamready');
  window.dispatchEvent(ready);
}