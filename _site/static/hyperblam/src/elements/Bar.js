import { Base } from '../helpers/Base.js';
import { define } from '../helpers/define.js';

class Bar extends Base {
  patternToValues(pattern) {
    let parts = pattern.split(' ');
    let values = parts.map(v => {
      if (v === '?') {
        return undefined;
      }
      if (v === '0') {
        return null;
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
      return this.random.oneOf(this.pool);
    }
    return this.steps[step];
  }

  get s() {
    return this.getAttribute('s');
	}

	set s(value) {
		if (value) {
			this.setAttribute('s', value);
    }
  }

  get fill() {
		return this.hasAttribute('fill');
	}

	set fill(value) {
		this.toBoolean('fill', value);
	}

  get chance() {
    let value = this.getAttribute('chance');
    return this.parse(value, 1);
	}

	set chance(value) {
		if (value) {
			this.setAttribute('chance', value);
    }
  }

  static get observedAttributes () {
    return ['s', 'fill'];
  }

  attributeChangedCallback(name) {
    if (name === 's') {
      this.steps = this.patternToValues(this.s);
      this.pool = [...new Set(this.steps)];
    }
  }

  static {
    define(this);
  }
}

export { Bar }