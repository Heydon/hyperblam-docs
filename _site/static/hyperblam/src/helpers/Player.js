import { Base } from '../helpers/Base.js';

class Player extends Base {
  constructor() {
		super();
    this.gainNode = this.context().createGain();
	}

  onblamready() {
    this.outElem = this.getOut();
    this.gainNode.connect(this.outElem.inNode);
  }

  onbank(event) {
    this.sounds = event.detail.sounds;
    this.fire('sounds', { tonal: !!this.root }, this);
  }

  chokePrev(time) {
    this.choke && 
    this.prevGainNode && 
    this.prevGainNode.gain.setTargetAtTime(0, time, this.choke);
  }

  muteUnmute() {
    this.gainNode.gain.setTargetAtTime(
      this.mute ? 0 : this.gain,
      this.getTime(),
      this.choke
    );
  }

  instantiate(cipher) {
    let buffer = this.assignBuffer(cipher);
    if (!buffer) {
      return null;
    }

    let node = this.context().createBufferSource();
    node.buffer = buffer;
    this.prevSound = node.buffer;
    let gainNode = this.context().createGain();
    node.connect(gainNode)
        .connect(this.gainNode);

    return { node, gainNode };
  }

  prePlay() {
    this.exposeParams({
      detune: this.instance.node.detune,
      playbackRate: this.instance.node.playbackRate,
      gain: this.instance.gainNode.gain
    });
  }

  play(cipher, time) {
    this.time = time || this.context().currentTime;
    this.instance = this.instantiate(cipher);
    if (!this.instance) {
      return;
    }

    this.chokePrev(this.time);
    this.prePlay(cipher, this.time);
    this.fire('blam', {
      instance: this.instance,
      player: this,
      time: this.time
    }, this, false);

    this.instance.node.start(this.time);
    this.length && this.instance.gainNode.gain.setTargetAtTime(
      0,
      this.time + (this.length * this.beat), 
      this.choke
    );

    this.prevGainNode = this.instance.gainNode;
  }

  get bank() {
		return this.getAttribute('bank');
	}

	set bank(value) {
		if (value) {
			this.setAttribute('bank', value);
    }
  }

  get out() {
		return this.getAttribute('out');
	}

	set out(value) {
		if (value) {
			this.setAttribute('out', value);
    }
  }

  get gain() {
    let value = this.getAttribute('gain');
		return this.parse(value, 1);
	}

	set gain(value) {
		if (value) {
			this.setAttribute('gain', value);
    }
  }

  get length() {
    let value = this.getAttribute('length');
		return this.parse(value);
	}

	set length(value) {
		if (value) {
			this.setAttribute('length', value);
    }
  }

  get mute() {
		return this.hasAttribute('mute');
	}

	set mute(value) {
    this.toBoolean('mute', value);
	}

  get choke() {
    let value = this.getAttribute('choke');
    return value === '' ? 0.01 : this.parse(value);
	}

	set choke(value) {
		if (value) {
			this.setAttribute('choke', value);
    }
  }

  get robin() {
		return this.hasAttribute('robin');
	}

	set robin(value) {
		this.toBoolean('robin', value);
	}

  static get observedAttributes () {
    return ['gain', 'mute'];
  }

  attributeChangedCallback(name, _, newVal) {
    if (name === 'gain') {
      this.gainNode.gain.setValueAtTime(newVal, this.getTime());
    }
    if (name === 'mute') {
      this.muteUnmute(newVal);
    }
  }

  connectedCallback() {
    this.setAttribute('data-player-blam', '');
    this.bankElem = this.bank ? document.getElementById(this.bank) : this.querySelector('bank-blam');
    this.bankElem.addEventListener('bank', this);
  }

  disconnectedCallback() {
    this.bankElem.removeEventListener('bank', this);
  }
}

export { Player }