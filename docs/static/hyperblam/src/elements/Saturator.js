import { Box } from '../primitives/Box.js';
import { define } from '../tools/define.js';

class Saturator extends Box {
  constructor() {
    super();
    this.mixInitial = 1;

    this.highPassNode = this.c.createBiquadFilter();
    this.highPassNode.type = 'highpass';
    this.shaperNode = this.c.createWaveShaper();
    this.shaperNode.oversample = '2x';
    this.lowPassNode = this.c.createBiquadFilter();
    this.attenuatorNode = this.c.createGain();
    this.inNode.connect(this.highPassNode)
      .connect(this.shaperNode)
      .connect(this.attenuatorNode)
      .connect(this.lowPassNode)
      .connect(this.wetGainNode);

    this.shaperNode.curve = this.makeCurve();

    this.mirrorParams({
      gain: this.attenuatorNode.gain,
      lowcut: this.highPassNode.frequency,
      highcut: this.lowPassNode.frequency
    });
  }

  makeCurve() {
    const a = this.amount;
    const samples = 44100;
    const curve = new Float32Array(samples);
  
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      if (this.mode == 1) {
        curve[i] = Math.tanh(x * a);
      }
      if (this.mode == 2) {
        curve[i] = Math.cos(x * a);
      }
      if (this.mode == 3) {
        curve[i] = (a * 20) * Math.abs(x / a);
      }
      if (this.mode == 4) {
        curve[i] = Math.sin(a * Math.acos(x / 5));
      }
    }
    return curve;
  }

  get amount() {
    let value = this.getAttribute('amount');
		return value ? parseFloat(value) : 50;
	}

	set amount(value) {
		this.setAttribute('amount', value);
  }

  get mode() {
    let value = this.getAttribute('mode');
		return value ? parseFloat(value) : 1;
	}

	set mode(value) {
		this.setAttribute('mode', value);
  }

  get lowcut() {
    let value = this.getAttribute('lowcut');
		return value ? parseFloat(value) : 100;
	}

	set lowcut(value) {
		this.setAttribute('lowcut', value);
  }

  get highcut() {
    let value = this.getAttribute('highcut');
		return value ? parseFloat(value) : 20000;
	}

	set highcut(value) {
		this.setAttribute('highcut', value);
  }

  get gain() {
    let value = this.getAttribute('gain');
		return value ? parseFloat(value) : 0.1;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'gain', 'lowcut', 'highcut', 'mode', 'amount'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (['mode', 'amount'].includes(name)) {
      this.shaperNode.curve = this.makeCurve();
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  static {
    define(this);
  }
}

export { Saturator }