import { Osc } from '../primitives/Osc.js';
import { define } from '../tools/define.js';

class LFO extends Osc {
  constructor() {
    super();
    this.defaultOut = () => [this.parentNode];
  }

  onblamready() {
    this.outElems = this.out ? [...document.querySelectorAll(this.out)] : this.defaultOut();
    for (const outElem of this.outElems) {
      this.connect(outElem);
      outElem.addEventListener('blamparams', this);
    }
    // ↓ Start all LFOs at the same time
    this.start(this.c.currentTime);
  }

  onblamparams(event) {
    this.connect(event.detail.elem);
  }

  connect(outElem) {
    let target = outElem?.params[this.prop];
    if (target) {
      this.gainNode.connect(target);
      if (this.prop === 'beats') {
        // ↓ Convert to either hertz or seconds
        let gain;
        if (outElem.toHertz) {
          let beats = this.hertzToBeats(target.value);
          gain = (this.gainNode.gain.value / beats) * target.value;
        } else {
          gain = this.conversions.beats(this.gain);
        }
        this.gainNode.gain.value = gain;
      }
    }
  }

  get prop() {
		return this.getAttribute('prop') || 'gain';
	}

	set prop(value) {
		this.setAttribute('prop', value);
  }

  get out() {
		return this.getAttribute('out');
	}

	set out(value) {
		this.setAttribute('out', value);
  }

  get off() {
		return this.hasAttribute('off');
	}

	set off(value) {
		this.toBoolean('off', value);
	}

  disconnectedCallback() {
    for (const outElem of this.outElems) {
      outElem.removeEventListener('blamparams', this);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'off'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'off') {
      this.params.gain = this.off ? 0 : this.gain;
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  static {
    define(this);
  }
}

export { LFO }