import { Base } from '../helpers/Base.js';
import { define } from '../helpers/define.js';

class Audio extends Base {
  constructor() {
    super();
    this.context = new AudioContext();
    this.sampleCount = 0;
    this.inNode = this.context.createGain();
  }

  onsample() {
    this.sampleCount++;
    if (this.sampleElems.length == this.sampleCount) {
      this.inNode.connect(this.context.destination);
      this.fire('samples', {}, this);
    }
  }

  get gain() {
    let value = this.getAttribute('gain');
		return this.parse(value, 0.75);
	}

	set gain(value) {
		if (value) {
			this.setAttribute('gain', value);
    }
  }

  get bpm() {
    let value = this.getAttribute('bpm');
		return this.parse(value, 120);
	}

	set bpm(value) {
		if (value) {
			this.setAttribute('bpm', value);
    }
  }

  static get observedAttributes () {
    return ['gain'];
  }

  attributeChangedCallback(name) {
    if (name === 'gain') {
      this.inNode.gain.value = this.gain;
    }
  }

  connectedCallback() {
    this.sampleElems = [...this.querySelectorAll('sample-blam')];
    this.addEventListener('sample', this);
  }

  static {
    define(this);
  }
}

export { Audio }