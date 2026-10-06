import { WithParams } from './WithParams.js';


class Operator extends WithParams {
  onblamready() {
    this.c = this.context();
    this.outNode = this.c.createGain();
  }

  connectGain() {
    this.gainNode = this.c.createGain();
    this.gainNode.gain.value = 0;
    this.gainNode.connect(this.outNode);
  }

  connectInput() {
    this.node = this.c.createOscillator();
    this.node.type = this.type;
    this.node.connect(this.gainNode);    
  }

  instantiate(note) {
    this.connectGain();
    this.connectInput();
    this.node.frequency.value = this.setFreq(note);
    this.mirrorParams({
      gain: this.gainNode.gain,
      detune: this.node.detune,
      freq: this.node.frequency,
      type: this.node
    });
  }

  stop() {
    this.prevGainNode && this.prevGainNode.gain.linearRampToValueAtTime(
      0, 
      this.time + (this.release * this.beat)
    );
  }

  envelope() {
    for (let pair of this.pairs) {
      this.gainNode.gain.linearRampToValueAtTime(
        pair[0], 
        this.time + (pair[1] * this.beat)
      );
    }
  }

  prePlay(note) {
    this.stop();
    this.instantiate(note);
    this.node && this.node.start();
  }

  play(note, time) {
    this.time = time || this.c.currentTime;

    this.prePlay(note);

    this.envelope();

    this.fire('blam', {
      ...this.instance,
      time: this.time
    }, this);

    this.prevGainNode = this.gainNode;
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

  get curve() {
    return this.getAttribute('curve') || '0 0, 1 0.005';
	}

	set curve(value) {
		this.setAttribute('curve', value);
  }

  get out() {
    return this.getAttribute('out');
	}

	set out(value) {
		this.setAttribute('out', value);
  }

  get release() {
		let value = this.getAttribute('release');
    return value ? parseFloat(value) : 1;
	}

	set release(value) {
		this.setAttribute('release', value);
  }

  static get observedAttributes () {
    return ['gain', 'curve', 'type'];
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