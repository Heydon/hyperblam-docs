import { Handle } from './Handle.js';

class Template extends Handle {
  onblamready() {
    this.setToFrom();
    this.init();
    this.count = 0
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
        this.toElem.innerHTML = '';
        this.count = 0;
      }
      this.toElem.innerHTML += interpolated;
    } else {
      this.toElem.innerHTML = interpolated;
    }
    this.additive && this.count++;
  }

  setToFrom() {
    this.allElems = this.from ? [...document.querySelectorAll(this.from)] : this.defaultFrom();
    this.fromElems = this.allElems.filter(elem => elem.nodeName.includes('-BLAM'));
    this.toElem = this.to ? document.getElementById(this.to) : this.defaultTo(); 
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