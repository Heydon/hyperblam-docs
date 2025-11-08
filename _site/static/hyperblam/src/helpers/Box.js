import { Base } from './Base.js';
import { define } from './define.js';

class Box extends Base {
  constructor() {
    super();
    this.dryInitial = 0;
    this.wetInitial = 1;

    this.inNode = this.context().createGain();
    this.dryGainNode = this.context().createGain();
    this.wetGainNode = this.context().createGain();
    this.outNode = this.context().createGain();
    
    // ↓ Connect dry path
    this.inNode.connect(this.dryGainNode)
               .connect(this.outNode);
    // ↓ Connect wetGain to out
    this.wetGainNode.connect(this.outNode);

    this.exposeParams({
      dry: this.dryGainNode.gain,
      wet: this.wetGainNode.gain
    });
  }

  calibrate() {
    this.dryGainNode.gain.setValueAtTime(this.bypass ? this.wet : this.dry, this.getTime());
    this.wetGainNode.gain.setValueAtTime(this.bypass ? 0 : this.wet, this.getTime());
  }

  get dry() {
    let value = this.getAttribute('dry');
		return this.parse(value, this.dryInitial);
	}

	set dry(value) {
		if (value) {
			this.setAttribute('dry', value);
    }
  }

  get wet() {
    let value = this.getAttribute('wet');
		return this.parse(value, this.wetInitial);
	}

	set wet(value) {
		if (value) {
			this.setAttribute('wet', value);
    }
  }

  get bypass() {
		return this.hasAttribute('bypass');
	}

	set bypass(value) {
		this.toBoolean('bypass', value);
	}

  static get observedAttributes () {
    return ['bypass', 'wet', 'dry'];
  }

  attributeChangedCallback() {
    this.calibrate();
  }

  connectedCallback() {
    this.calibrate();
  }

  static {
    define(this);
  }
}

export { Box }