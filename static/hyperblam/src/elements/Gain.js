import { Box } from '../primitives/Box.js';
import { define } from '../tools/define.js';

class Gain extends Box {
  constructor() {
    super();
    this.node = this.c.createGain();
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);

    this.mirrorParams({
      gain: this.node.gain
    });
  }

  get gain() {
    let value = this.getAttribute('gain');
		return value ? parseFloat(value) : 1;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'gain'];
  }

  static {
    define(this);
  }
}

export { Gain }