import { Box } from '../helpers/Box.js';
import { define } from '../helpers/define.js';

class Filter extends Box {
  constructor() {
    super();
    this.types = ['lowpass', 'highpass', 'bandpass', 'notch'];
    
    this.node = this.context().createBiquadFilter();
    this.node.type = this.type;
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);

    this.exposeParams({
      freq: this.node.frequency,
      q: this.node.Q
    });
  }

  calibrate() {
    super.calibrate();
    this.node.frequency.setValueAtTime(this.freq, this.getTime());
    this.node.Q.setValueAtTime(this.q, this.getTime());
  }

  get freq() {
    let value = this.getAttribute('freq');
		return this.parse(value, 1000);
	}

	set freq(value) {
		if (value) {
			this.setAttribute('freq', freq);
    }
  }

  get q() {
    let value = this.getAttribute('q');
		return this.parse(value, 1);
	}

	set q(value) {
		if (value) {
			this.setAttribute('type', value);
    }
  }

  get type() {
    let value = this.getAttribute('type');
		return this.types.includes(value) && value || 'lowpass';
	}

	set type(value) {
		if (value) {
			this.setAttribute('type', value);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'freq', 'q'];
  }

  static {
    define(this);
  }
}

export { Filter }