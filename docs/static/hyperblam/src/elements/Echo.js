import { Box } from '../primitives/Box.js';
import { define } from '../tools/define.js';

class Echo extends Box {
  constructor() {
    super();
    this.node = this.c.createDelay();
    this.gainNode = this.c.createGain();
    this.filterNode = this.c.createBiquadFilter();

    this.mixInitial = 1;

    // ↓ Create feedback loop
    this.node.connect(this.gainNode)
             .connect(this.filterNode)
             .connect(this.node);

    this.inNode.connect(this.gainNode)
               .connect(this.wetGainNode);

    this.mirrorParams({
      beats: this.node.delayTime,
      cutoff: this.filterNode.frequency,
      feedback: this.gainNode.gain
    });
  }

  setMix() {
    this.setParam('wet', this.mix);
    this.setParam('dry', 1);
    this.prevMix = this.mix;
  }

  passOrBypass() {
    this.setParam('wet', this.bypass ? 0 : this.prevMix);
  }

  get beats() {
    let value = this.getAttribute('beats');
    return this.conversions.beats(value || 1);
	}

	set beats(value) {
		this.setAttribute('beats', value);
  }

  get feedback() {
    let value = this.getAttribute('feedback');
		return value ? Math.min(parseFloat(value), 0.75) : 0.5;
	}

	set feedback(value) {
    this.setAttribute('feedback', value);
  }

  get cutoff() {
    let value = this.getAttribute('cutoff');
		return value ? parseFloat(value) : 20000;
	}

	set cutoff(value) {
		this.setAttribute('cutoff', value);
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'beats', 'feedback', 'cutoff'];
  }

  static {
    define(this);
  }
}

export { Echo }