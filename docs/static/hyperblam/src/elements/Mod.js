import { Set } from '../primitives/Set.js';

class Mod extends Set {
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

    this.mirrorParams({
      gain: this.oscGainNode.gain,
      beats: this.oscNode.frequency
    });

    this.conversions = {
      beats: value => this.beatsToHertz(value)
    }
  }

  handle(event) {
    if (!this.started) {
      this.oscNode.start(event?.detail?.time || this.getTime());
      this.started = true;
    }
    this.analyserNode.getFloatTimeDomainData(this.data);
    super.handle(event, this.data[0] + this.value);
  }

  get beats() {
    let value = this.getAttribute('beats');
    let hertz = this.conversions.beats(value || 1);
		return this.invert ? hertz * -1 : hertz;
	}

	set beats(value) {
		this.setAttribute('beats', value);
  }

  get gain() {
    let value = this.getAttribute('gain');
		return value ? parseFloat(value) : 0.5;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  get wave() {
    let value = this.getAttribute('wave');
		return ['square', 'sawtooth', 'sine'].find(v => v === value) || 'triangle';
	}

	set wave(value) {
		this.setAttribute('wave', value);
  }

  get invert() {
		return this.hasAttribute('invert');
	}

	set invert(value) {
		this.toBoolean('invert', value);
	}

  static get observedAttributes () {
    return ['beats', 'gain', 'suspend'];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === 'suspend') {
      if (newValue) {
        this.oscNode.stop(this.getTime());
      }
    }
  }
}

export { Mod }