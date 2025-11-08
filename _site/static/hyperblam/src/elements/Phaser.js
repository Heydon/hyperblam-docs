import { Box } from '../helpers/Box.js';
import { define } from '../helpers/define.js';

class Phaser extends Box {
  constructor() {
    super();
    this.dryInitial = 0.5;
    this.wetInitial = 0.5;

    this.node = this.context().createBiquadFilter();
    this.node.type = 'allpass';
    this.LFONode = this.context().createOscillator();
    this.LFONode.start();
    this.LFOGainNode = this.context().createGain();
    this.LFONode.connect(this.LFOGainNode);
    this.LFOGainNode.connect(this.node.frequency);
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);

    this.exposeParams({
      depth: this.LFOGainNode.gain,
      q: this.node.Q,
      beats: this.LFONode.frequency,
      center: this.node.frequency
    });
  }

  calibrate() {
    super.calibrate();
    this.node.frequency.setValueAtTime(this.center, this.getTime());
    this.node.Q.setValueAtTime(this.q, this.getTime());
    this.LFONode.frequency.setValueAtTime(this.beats, this.getTime());
    this.LFOGainNode.gain.setValueAtTime(this.depth, this.getTime());
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

  get center() {
    let value = this.getAttribute('center');
		return this.parse(value, 4000);
	}

	set center(value) {
		if (value) {
			this.setAttribute('center', value);
    }
  }

  get depth() {
    let value = this.getAttribute('depth');
		return this.parse(value, 4000);
	}

	set depth(value) {
		if (value) {
			this.setAttribute('depth', value);
    }
  }

  get q() {
    let value = this.getAttribute('q');
		return this.parse(value, 1);
	}

	set q(value) {
		if (value) {
			this.setAttribute('q', value);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'depth', 'q', 'beats', 'center'];
  }

  disconnectedCallback() {
    this.LFONode.stop();
  }

  static {
    define(this);
  }
}

export { Phaser }