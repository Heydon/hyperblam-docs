import { WithParams } from './WithParams.js';

class Osc extends WithParams {
  constructor() {
    super();

    this.oscNode = this.context().createOscillator();
    this.gainNode = this.context().createGain();
    this.oscNode.connect(this.gainNode);
    this.oscNode.type = this.type;

    this.toHertz = true;
    this.conversions.beats = value => this.beatsToHertz(value);

    this.mirrorParams({
      gain: this.gainNode.gain,
      beats: this.oscNode.frequency,
      detune: this.oscNode.detune,
      type: this.oscNode
    });
  }

  start(time) {
    this.oscNode.start(time);
  }

  stop(time) {
    this.oscNode.stop(time);
  }

  get type() {
    let value = this.getAttribute('type');
		return ['square', 'sawtooth', 'triangle'].find(v => v === value) || 'sine';
	}

	set type(value) {
		this.setAttribute('type', value);
  }

  get gain() {
    let value = this.getAttribute('gain');
		return value ? parseFloat(value) : 1;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  get beats() {
    let value = this.getAttribute('beats');
    let hertz = this.conversions.beats(value || 1);
    return this.invert ? hertz * -1 : hertz;
  }

  set beats(value) {
    this.setAttribute('beats', value);
  }

  get invert() {
		return this.hasAttribute('invert');
	}

	set invert(value) {
		this.toBoolean('invert', value);
	}

  static get observedAttributes () {
    return ['beats', 'gain', 'type'];
  }
}

export { Osc }


