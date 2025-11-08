import { Box } from '../helpers/Box.js';
import { define } from '../helpers/define.js';

class Echo extends Box {
  constructor() {
    super();
    this.node = this.context().createDelay();
    this.gainNode = this.context().createGain();
    this.filterNode = this.context().createBiquadFilter();

    this.dryInitial = 1;
    this.wetInitial = 1;

    // ↓ Create feedback loop
    this.node.connect(this.gainNode)
             .connect(this.filterNode)
             .connect(this.node);

    this.inNode.connect(this.node)
               .connect(this.wetGainNode);

    this.exposeParams({
      beats: this.node.delayTime,
      cutoff: this.filterNode.frequency,
      feedback: this.gainNode.gain
    });
  }

  calibrate() {
    super.calibrate();
    this.node.delayTime.setValueAtTime(this.beat * this.beats, this.getTime());
    this.gainNode.gain.setValueAtTime(this.feedback, this.getTime());
	  this.filterNode.frequency.setValueAtTime(this.cutoff, this.getTime());
  }

  get beats() {
    let value = this.getAttribute('beats');
    return this.parse(value, 1);
	}

	set beats(value) {
		if (value) {
			this.setAttribute('beats', value);
    }
  }

  get feedback() {
    let value = this.getAttribute('feedback');
		return value ? Math.min(this.parse(value), 0.75) : 0.5;
	}

	set feedback(value) {
		if (value) {
			this.setAttribute('feedback', value);
    }
  }

  get cutoff() {
    let value = this.getAttribute('cutoff');
		return this.parse(value, 3000);
	}

	set cutoff(value) {
		if (value) {
			this.setAttribute('cutoff', value);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'beats', 'feedback', 'cutoff'];
  }

  static {
    define(this);
  }
}

export { Echo }