import { random } from '../hyperblam/dist/hyperblam/tools/random.js';

class Disrupt extends HTMLElement {
  constructor() {
    super();
    this.remains = { x: 1, y: 0 }

    this.select = {
      one: h => [random.oneOf(h)],
      some: h => random.some(h),
      all: h => h
    }
  }

  shift(value) {
    if (!random.chance(this.frequency)) {
      return value;
    }
    return random.floatBetween(value - this.gain, value + this.gain);
  }

  restorePath(path) {
    path.setAttribute('d', this.strings[this.paths.indexOf(path)]);
  }

  disruptPath(path) {
    let data = path.getPathData();
    data.forEach(seg => {
      seg.values.forEach((val, index) => {
        for (const [k, v] of Object.entries(this.remains)) {
          if (this.axes.includes(k) && index % 2 == v) {
            seg.values[index] = this.shift(val);
          }        
        }   
      });
    });
    path.setPathData(data);
  }

  disrupt() {
    let paths = this.select[this.mode](this.paths);
    console.log(paths);
    paths.forEach(path => {
      this.disruptPath(path);
    });
  }

  restore() {
    this.paths.forEach(path => {
      this.restorePath(path);
    });    
  }

  get frequency() {
    let value = this.getAttribute('frequency');
    return value ? parseFloat(value) : 1;
	}

	set frequency(value) {
		this.setAttribute('frequency', value);
  }

  get gain() {
    let value = this.getAttribute('gain');
    return value ? parseFloat(value) : 10;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  get axes() {
    return this.getAttribute('axes') || 'xy';
	}

	set axes(value) {
		this.setAttribute('axes', value);
  }

  get mode() {
    let value = this.getAttribute('mode');
		return ['one', 'some', 'all'].find(v => v === value) || 'all';
	}

	set mode(value) {
		this.setAttribute('mode', value);
  }
  
  connectedCallback() {
    this.paths = [...this.querySelectorAll('path')];
    console.log(this.paths);
    this.strings = this.paths.map(path => path.getAttribute('d'));
  }
}

export { Disrupt }