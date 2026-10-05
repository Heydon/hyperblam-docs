import { WithParams } from './WithParams.js';


class Operator extends WithParams {
  constructor() {
    super();
  }

  onblamready() {
    this.c = this.context();
    this.gainNode = this.c.createGain();
  }

  instantiate(note) {
    let node = this.c.createOscillator();
    node.type = this.type;
    let gainNode = this.c.createGain();
    gainNode.gain.value = 0;

    node.connect(gainNode)
        .connect(this.gainNode);

    this.setFreq(node, note);

    this.mirrorParams({
      detune: node.detune,
      gain: gainNode.gain,
      type: node
    });

    return { node, gainNode };
  }

  stop() {
    this.prevGainNode && this.prevGainNode.gain.linearRampToValueAtTime(
      0, 
      this.time + (this.release * this.beat)
    );
  }

  prePlay(note) {
    this.instance = this.instantiate(note);
    this.stop();
  }

  play(note, time) {
    this.time = time || this.c.currentTime;

    this.prePlay(note);

    this.instance.node.start();

    for (let pair of this.pairs) {
      this.instance.gainNode.gain.linearRampToValueAtTime(
        pair[0], 
        this.time + (pair[1] * this.beat)
      );
    }

    this.fire('blam', {
      ...this.instance,
      time: this.time
    }, this);

    this.prevGainNode = this.instance.gainNode;
  }

  get gain() {
    let value = this.getAttribute('gain');
		return value ? parseFloat(value) : 1;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  get curve() {
    return this.getAttribute('curve');
	}

	set curve(value) {
		this.setAttribute('curve', value);
  }

  get release() {
		let value = this.getAttribute('release');
    return value ? parseFloat(value) : 1;
	}

	set release(value) {
		this.setAttribute('release', value);
  }

  get type() {
    let value = this.getAttribute('type');
		return ['square', 'sawtooth', 'triangle'].find(v => v === value) || 'sine';
	}

	set type(value) {
		this.setAttribute('type', value);
  }

  static get observedAttributes () {
    return ['gain', 'curve'];
  }

  attributeChangedCallback(name, _, value) {
    if (name === 'curve') {
      this.parseCurve();
    }
    super.attributeChangedCallback(name, _, value);
  }

  connectedCallback() {
    this.parseCurve();
  }
}

export { Operator }