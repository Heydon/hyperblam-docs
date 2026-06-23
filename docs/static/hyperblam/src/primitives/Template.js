import { Handle } from './Handle.js';

class Template extends Handle {
  constructor() {
    super();
    this.hidden = true;
    this.count = 0;
  }

  onblamready() {
    this.setToFrom();
    this.init();
  }

  init() {
    this.template = this.innerHTML;
    this.innerHTML = '';
  }

  interpolate(template, data) {
    const regex = /\[\[(.*?)\]\]/g;
    let interpolated = template.replace(regex, (match, prop) => {
      return data[prop];
    });
    if (this.additive) {
      if (this.count >= this.max) {
        this.toElems[0].innerHTML = '';
        this.count = 0;
      }
      this.toElems[0].innerHTML += interpolated;
    } else {
      this.toElems[0].innerHTML = interpolated;
    }
    this.additive && this.count++;
  }

  get additive() {
		return this.hasAttribute('additive');
	}

	set additive(value) {
		this.toBoolean('additive', value);
	}

  get max() {
    return this.getAttribute('max') || 16;
	}

	set max(value) {
		this.setAttribute('max', value);
  }
}

export { Template }