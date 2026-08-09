import { Handle } from './Handle.js';

class Template extends Handle {
  constructor() {
    super();
    this.count = 0;
    this.defaultTo = () => [this];
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
    let interpolated = template.replace(regex, (_, prop) => {
      let parsed = !isNaN(data[prop]) ? parseFloat(data[prop]).toFixed(this.places) : data[prop];
      return parsed;
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

  get places() {
    return this.getAttribute('places') || 1;
	}

	set places(value) {
		this.setAttribute('places', value);
  }
}

export { Template }