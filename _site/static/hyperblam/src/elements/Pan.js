import { Box } from '../helpers/Box.js';
import { define } from '../helpers/define.js';

class Pan extends Box {
  constructor() {
    super();
    this.node = this.context().createStereoPanner();
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);

    this.exposeParams({
      pan: this.node.pan
    });
  }

  calibrate() {
    super.calibrate();
    this.node.pan.setValueAtTime(this.pan, this.getTime());
  }

  get pan() {
    let value = this.getAttribute('pan');
		return this.parse(value, 0);
	}

	set pan(value) {
		if (value) {
			this.setAttribute('pan', value);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'pan'];
  }

  static {
    define(this);
  }
}

export { Pan }