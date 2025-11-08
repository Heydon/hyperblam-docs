import { Event } from '../helpers/Event.js';
import { define } from '../helpers/define.js';

class Envelope extends Event {
  constructor() {
    super();
    this.defaultPubs = () => [this.closest('[data-player-blam]')];
  }

  parseCurve() {
    this.pairs = this.curve.replaceAll(', ', ',').split(',').map(pair => {
      return pair.split(' ').map(string => parseFloat(string));
    });
  }

  modify(event) {
    for (const sub of this.subElems) {
      let param = sub?.params[this.target];
      if (!param) {
        return;
      }
      
      let time = event.detail.time;
      if (this.target === 'playbackRate') {
        this.pairs.forEach(pair => {
          pair[0] = pair[0] * param.value;
        });
      }
      param.cancelScheduledValues(time);
      for (let pair of this.pairs) {
        param.linearRampToValueAtTime(pair[0], time + pair[1] + 0.01);
      }
    }
  }

  get curve() {
    let value = this.getAttribute('curve');
		return this.parse(value);
	}

	set curve(value) {
		if (value) {
			this.setAttribute('curve', value);
    }
  }

  static get observedAttributes () {
    return ['curve'];
  }

  attributeChangedCallback(name) {
    if (name === 'curve') {
      this.parseCurve();
    }
  }

  static {
    define(this);
  }
}

export { Envelope }