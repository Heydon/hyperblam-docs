import { Osc } from '../primitives/Osc.js';

class Lfo extends Osc {
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
        // ↓ Convert
        let gain = outElem.conversions.beats(this.gain);
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

  get bypass() {
		return this.hasAttribute('bypass');
	}

	set bypass(value) {
		this.toBoolean('bypass', value);
	}

  disconnectedCallback() {
    for (const outElem of this.outElems) {
      outElem.removeEventListener('blamparams', this);
    }
  }

  static get observedAttributes () {
    return [...super.observedAttributes, 'bypass'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'bypass') {
      this.params.gain = this.bypass ? 0 : this.gain;
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }
}

export { Lfo }