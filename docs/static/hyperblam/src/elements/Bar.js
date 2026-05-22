import { Base } from '../primitives/Base.js';
import { define } from '../tools/define.js';
import { random } from '../tools/random.js';

class Bar extends Base {
  patternToValues(pattern) {
    let parts = pattern.split(' ');
    let values = parts.map(v => {
      if (v === '?') {
        return undefined;
      }
      if (v === '0') {
        return 0;
      }
      if (!!Number(v)) {
        return parseInt(v);
      }
      return v;
    });
    return values;
  }

  getCipher(step) {
    if (this.fill) {
      return random.oneOf(this.steps);
    }
    return this.steps[step];
  }

  get s() {
    return this.getAttribute('s');
	}

	set s(value) {
		this.setAttribute('s', value);
  }

  get fill() {
		return this.hasAttribute('fill');
	}

	set fill(value) {
		this.toBoolean('fill', value);
	}

  get chance() {
    let value = this.getAttribute('chance');
    return value ? parseFloat(value) : null;
	}

	set chance(value) {
		this.setAttribute('chance', value);
  }

  get x() {
    let value = this.getAttribute('x');
    return value ? parseFloat(value) : 1;
	}

	set x(value) {
		this.setAttribute('x', value);
  }

  static get observedAttributes () {
    return ['s'];
  }

  attributeChangedCallback(name) {
    if (name === 's') {
      this.steps = this.patternToValues(this.s);
    }
  }

  static {
    define(this);
  }
}

export { Bar }