import { Box } from '../helpers/Box.js';
import { define } from '../helpers/define.js';

class Gain extends Box {
  constructor() {
    super();
    this.node = this.context().createGain();
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);

    this.exposeParams({
      gain: this.node.gain
    });
  }

  calibrate() {
    super.calibrate();
    this.node.gain.setValueAtTime(this.gain, this.getTime());
  }

  get gain() {
    let value = this.getAttribute('gain');
		return this.parse(value, 1);
	}

	set gain(value) {
		if (value) {
			this.setAttribute('gain', value);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'gain'];
  }

  static {
    define(this);
  }
}

export { Gain }