import { PropParamMethod } from '../helpers/PropParamMethod.js';
import { define } from '../helpers/define.js';

class Mod extends PropParamMethod {
  constructor() {
    super();
    this.oscNode = this.context().createOscillator();
    this.oscNode.type = this.wave;
    this.oscGainNode = this.context().createGain();
    this.analyserNode = this.context().createAnalyser();
    this.analyserNode.fftSize = 32;
    this.length = this.analyserNode.fftSize;
    this.data = new Float32Array(this.length);

    this.oscNode.connect(this.oscGainNode)
                .connect(this.analyserNode);

    this.started = false;

    this.exposeParams({
      gain: this.oscGainNode.gain,
      beats: this.oscNode.frequency
    });
  }

  calibrate() {
    let hertz = this.toHertz(this.invert ? this.beats * -1 : this.beats);
    this.oscNode.frequency.setValueAtTime(hertz, this.getTime());
    this.oscGainNode.gain.setValueAtTime(this.gain, this.getTime());
  }

  handleEvent(event) {
    if (event.type === this.event) {
      if (!this.started) {
        this.oscNode.start(event?.detail?.time || this.getTime());
        this.started = true;
      }
      this.analyserNode.getFloatTimeDomainData(this.data);
      super.modify(event, this.data[0] + this.value);
    }
  }

  get beats() {
    let value = this.getAttribute('beats');
    return this.parse(value, 16);
	}

	set beats(value) {
		if (value) {
			this.setAttribute('beats', value);
    }
  }

  get gain() {
    let value = this.getAttribute('gain');
		return value ? this.parse(value) : 0.5;
	}

	set gain(value) {
		if (value) {
			this.setAttribute('gain', value);
    }
  }

  get wave() {
    let value = this.getAttribute('wave');
		return ['square', 'sawtooth', 'sine'].find(v => v === value) || 'triangle';
	}

	set wave(value) {
		if (value) {
			this.setAttribute('wave', value);
    }
  }

  get invert() {
		return this.hasAttribute('invert');
	}

	set invert(value) {
		this.toBoolean('invert', value);
	}

  static get observedAttributes () {
    return ['beats', 'gain'];
  }

  attributeChangedCallback() {
    this.calibrate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.calibrate();
  }

  disconnectedCallback() {
    this.oscNode.stop();
  }

  static {
    define(this);
  }
}

export { Mod }