import { Base } from '../helpers/Base.js';
import { define } from '../helpers/define.js';

class LFO extends Base {
  constructor() {
    super();
    this.oscNode = this.context().createOscillator();
    this.gainNode = this.context().createGain();
    this.oscNode.connect(this.gainNode);
    this.oscNode.start();
    this.isHertz = true;
  }

  connect() {
    let out = this.outElem?.params[this.param];
    if (out) {
      if (this.param === 'beats') {
        let hertz = this.outElem.isHertz;
        // ↓ Convert to either hertz or seconds
        let gain = hertz ? this.toHertz(this.gain) : this.beat * this.gain;
        this.gainNode.gain.value = gain;
      }
      this.gainNode.connect(out);
    }
  }

  onparams() {
    this.connect();  
  }

  get wave() {
    let value = this.getAttribute('wave');
		return ['square', 'sawtooth', 'triangle'].find(v => v === value) || 'sine';
	}

	set wave(value) {
		if (value) {
			this.setAttribute('wave', value);
    }
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

  get beats() {
    let value = this.getAttribute('beats');
		return this.toHertz(value);
	}

	set beats(value) {
		if (value) {
			this.setAttribute('beats', value);
    }
  }

  get invert() {
		return this.hasAttribute('invert');
	}

	set invert(value) {
		this.toBoolean('invert', value);
	}

  get param() {
		return this.getAttribute('param');
	}

	set param(value) {
		if (value) {
			this.setAttribute('param', value);
    }
  }

  connectedCallback() {
    let time = this.context().currentTime;
    this.oscNode.wave = this.wave;
    this.oscNode.frequency.setValueAtTime(
      this.invert ? this.beats * -1 : this.beats,
      time
    );
    this.gainNode.gain.value = this.gain;

    this.outElem = this.parentNode;
    this.outElem.addEventListener('params', this);

    this.exposeParams({
      gain: this.gainNode.gain,
      beats: this.oscNode.frequency,
      detune: this.oscNode.detune
    });

    this.outElem.params && this.connect();
  }

  disconnectedCallback() {
    this.outElem.removeEventListener('params', this);
    this.oscNode.stop();
  }

  static {
    define(this);
  }
}

export { LFO }