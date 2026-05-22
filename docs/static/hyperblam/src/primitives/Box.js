import { WithParams } from './WithParams.js';

class Box extends WithParams {
  constructor() {
    super();
    this.isBox = true;

    this.mixInitial = 1;

    this.inNode = this.c.createGain();
    this.dryGainNode = this.c.createGain();
    this.wetGainNode = this.c.createGain();
    this.outNode = this.c.createGain();
    
    // ↓ Connect dry path
    this.inNode.connect(this.dryGainNode)
               .connect(this.outNode);
    // ↓ Connect wetGain to out
    this.wetGainNode.connect(this.outNode);

    this.mirrorParams({
      dry: this.dryGainNode.gain,
      wet: this.wetGainNode.gain
    });
  }

  setMix() {
    this.setParam('wet', this.mix);
    this.setParam('dry', 1 - this.mix);
    this.prevMix = this.mix;
  }

  passOrBypass(b) {
    this.setParam('wet', b ? 0 : this.prevMix);
    this.setParam('dry', b ? 1 : (1 - this.prevMix));
  }

  get mix() {
    let value = this.getAttribute('mix');
		return value ? parseFloat(value) : this.mixInitial;
	}

	set mix(value) {
		this.setAttribute('mix', value);
  }

  get bypass() {
		return this.hasAttribute('bypass');
	}

	set bypass(value) {
		this.toBoolean('bypass', value);
	}

  static get observedAttributes () {
    return ['bypass', 'mix'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'mix') {
      this.setMix();
      return;
    }
    if (name === 'bypass') {
      this.passOrBypass(newVal);
      return;
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  connectedCallback() {
    this.setMix();
    this.passOrBypass();
  }
}

export { Box }