import { Box } from '../primitives/Box.js';
import { define } from '../tools/define.js';

class Filter extends Box {
  constructor() {
    super();
    this.types = ['lowpass', 'highpass', 'bandpass', 'notch'];
    
    this.node = this.c.createBiquadFilter();
    this.node.type = this.type;
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);

    this.mirrorParams({
      freq: this.node.frequency,
      q: this.node.Q
    });
  }

  get freq() {
    let value = this.getAttribute('freq');
		return value ? parseFloat(value) : 20000;
	}

	set freq(value) {
		this.setAttribute('freq', value);
  }

  get q() {
    let value = this.getAttribute('q');
		return value ? parseFloat(value) : 1;
	}

	set q(value) {
		this.setAttribute('type', value);
  }

  get type() {
    let value = this.getAttribute('type');
		return this.types.includes(value) && value || 'lowpass';
	}

	set type(value) {
		this.setAttribute('type', value);
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'freq', 'q'];
  }

  static {
    define(this);
  }
}

export { Filter }