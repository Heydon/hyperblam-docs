import { WithParams } from '../primitives/WithParams.js';
import { random } from '../tools/random.js';

class Sampler extends WithParams {
  constructor() {
		super();
    this.setAttribute('data-sampler-blam', '');
    this.gainNode = this.context().createGain();
	}

  onblamready() {
    this.bankElem = this.bank ? document.getElementById(this.bank) : this.querySelector('bank-blam');
    this.gainNode.connect(this.getOut().inNode);
  }

  instantiate() {
    let node = this.context().createBufferSource();
    this.reversing = this.sample.reversed && random.chance(this.reverse);
    let buffer = this.reversing ? 'reversed' : 'buffer';
    node.buffer = this.sample[buffer];
    let gainNode = this.context().createGain();
    // ↓ Start at 0 for pop-suppressing ramp
    gainNode.gain.value = 0;
    node.connect(gainNode)
        .connect(this.gainNode);
    return { node, gainNode, ...this.sample };
  }

  chokePrev(time) {
    this.choke && this.stop(time);
  }

  prePlay() {
    this.instance = this.instantiate();
    this.instance.node.detune.setTargetAtTime(
      this.detune,
      this.context().currentTime,
      0.005
    );

    this.mirrorParams({
      detune: this.instance.node.detune,
      gain: this.instance.gainNode.gain
    });
    this.chokePrev(this.time);
  }

  postPlay() {
    this.length && !this.loop && this.instance && this.instance.gainNode.gain.setTargetAtTime(
      0,
      this.time + this.length, 
      this.choke || 0.005
    );
  }

  play(cipher, time) {
    this.time = time || this.context().currentTime;
    this.assignBuffer(cipher);

    if (this.sample) {
      this.prePlay(cipher);
      this.instance.gainNode.gain.setTargetAtTime(
        this.gain,
        this.time,
        0.005
      );

      this.instance.sampleDuration = this.instance.node.buffer.duration;
      this.instance.modDuration = this.getDuration(this.instance.node);
      this.instance.clipDuration = this.length ? Math.min(this.length, this.instance.modDuration) : this.instance.modDuration;
      
      if (this.loop) {
        this.instance.node.loop = true;
        this.instance.node.loopStart = Math.min(this.start, this.instance.buffer.duration);
        this.instance.node.loopEnd = this.start + Math.min(this.length || this.instance.buffer.duration);
      }

      this.instance.node.addEventListener('ended', () => {
        this.fire('blamend', {}, this);
      });

      let start = this.reversing && this.length ? this.instance.sampleDuration - this.instance.clipDuration : this.start;
      this.instance.node.start(this.time, Math.max(start, 0));
      this.fire('blam', {
        ...this.instance,
        time: this.time
      }, this);

      this.prevGainNode = this.instance.gainNode;
    }

    this.postPlay();
  }

  stop(time) {
    time = time || this.context().currentTime;
    this.prevGainNode && 
    this.prevGainNode.gain.setTargetAtTime(0, time, this.choke || 0.005);
  }

  get bank() {
		return this.getAttribute('bank');
	}

	set bank(value) {
		this.setAttribute('bank', value);
  }

  get out() {
		return this.getAttribute('out');
	}

	set out(value) {
		this.setAttribute('out', value);
  }

  get gain() {
    let value = this.getAttribute('gain');
		return value ? parseFloat(value) : 1;
	}

	set gain(value) {
		this.setAttribute('gain', value);
  }

  get robin() {
		return this.hasAttribute('robin');
	}

	set robin(value) {
		this.toBoolean('robin', value);
	}

  get loop() {
		return this.hasAttribute('loop');
	}

	set loop(value) {
		this.toBoolean('loop', value);
	}

  get choke() {
    let value = this.getAttribute('choke');
    if (value === '') return 0.005;
    if (isNaN(value) || value === null) return 0;
    return parseFloat(value);
	}

	set choke(value) {
		if (typeof value === 'number' && value !== 0) {
			return this.setAttribute('choke', value);
    }
    if (value) {
      return this.setAttribute('choke', '');
    }
    this.removeAttribute('choke');
  }

  get start() {
    let value = this.getAttribute('start');
		return value ? this.conversions.beats(value) : 0;
	}

	set start(value) {
		this.setAttribute('start', value);
  }

  get length() {
    let value = this.getAttribute('length');
		return value ? this.conversions.beats(value) : null;
	}

	set length(value) {
		this.setAttribute('length', value);
  }

  get detune() {
    let value = this.getAttribute('detune');
		return value ? parseFloat(value) : 0;
	}

	set detune(value) {
		this.setAttribute('detune', value);
  }

  get reverse() {
		let value = this.getAttribute('reverse');
    if (value === '') return 1;
    if (!value) return 0;
    return parseFloat(value);
	}

	set reverse(value) {
		this.setAttribute('reverse', value);
  }

  static get observedAttributes () {
    return ['gain', 'detune'];
  }
}

export { Sampler }