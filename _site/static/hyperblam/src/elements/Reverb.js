import { Box } from '../helpers/Box.js';
import { define } from '../helpers/define.js';

class Reverb extends Box {
  constructor() {
    super();
    this.dryInitial = 1;
    this.wetInitial = 0.5;
    this.node = this.context().createConvolver();
    this.filterNode = this.context().createBiquadFilter();
    this.inNode.connect(this.node)
               .connect(this.filterNode)
               .connect(this.wetGainNode);

    this.exposeParams({
      cutoff: this.filterNode.frequency
    });
  }

  onblamready() {
    this.srcElem = this.src ? document.querySelector(this.src) : this.querySelector('sample-blam');
    this.srcElem.addEventListener('sample', this);
    this.srcElem.fileToBuffer();
    this.calibrate();
  }

  onsample(event) {
    this.ir = event.detail;
    this.node.buffer = this.ir;
  }

  calibrate() {
    super.calibrate();
    this.filterNode.frequency.setValueAtTime(this.cutoff, this.getTime());
  }

  get src() {
    return this.getAttribute('src');
	}

	set src(value) {
		if (value) {
			this.setAttribute('src', value);
    }
  }

  get cutoff() {
    let value = this.getAttribute('cutoff');
		return this.parse(value, 10000);
	}

  set cutoff(value) {
		if (value) {
			this.setAttribute('cutoff', value);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'cutoff'];
  }

  static {
    define(this);
  }
}

export { Reverb }