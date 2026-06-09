import { Handle } from '../primitives/Handle.js';
import { random } from '../tools/random.js';

class Envelope extends Handle {
  constructor() {
    super();
    this.defaultFrom = () => [this.closest('[data-sampler-blam]')];
  }

  parseCurve() {
    this.pairs = this.curve.replaceAll(', ', ',').split(',').map(pair => {
      return pair.split(' ').map(string => parseFloat(string));
    });
  }

  handle(event) {
    if (!random.chance(this.chance)) {
      return;
    }
    for (const to of this.toElems) {
      let param = to?.params[this.prop];
      if (!param) {
        return;
      }
      let data = event.detail;
      let length = event.detail.length;
      let time = data.time;
      let x = this.beats ? this.beat : length;
      param.cancelScheduledValues(time);
      for (let pair of this.pairs) {
        param.linearRampToValueAtTime(
          pair[0], 
          time + (Math.min(pair[1] * x, length))
        );
      }
    }
  }

  get curve() {
    return this.getAttribute('curve');
	}

	set curve(value) {
		this.setAttribute('curve', value);
  }

  get beats() {
		return this.hasAttribute('beats');
	}

	set beats(value) {
		this.toBoolean('beats', value);
	}

  static get observedAttributes () {
    return ['curve'];
  }

  attributeChangedCallback(name) {
    if (name === 'curve') {
      this.parseCurve();
    }
  }
}

export { Envelope }