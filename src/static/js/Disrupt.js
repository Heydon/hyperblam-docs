import { random } from '../hyperblam/dist/hyperblam/tools/random.js';

class Disrupt extends HTMLElement {
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
        if (this.axes.includes('x') && index % 2 == 1) {
          seg.values[index] = this.shift(val);
        }
        if (this.axes.includes('y') && index % 2 == 0) {
          seg.values[index] = this.shift(val);
        }               
      });
    });
    path.setPathData(data);
  }

  disrupt() {
    this.paths.forEach(path => {
      this.disruptPath(path);
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

  get gain() {
    let value = this.getAttribute('gain');
    return value ? parseFloat(value) : 10;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  get axes() {
    let axes = this.getAttribute('axes');
    return value || 'xy';
	}

	set axes(value) {
		this.setAttribute('axes', value);
  }
  
  connectedCallback() {
    this.paths = [...this.querySelectorAll('path')];
    this.strings = this.paths.map(path => path.getAttribute('d'));
  }
}