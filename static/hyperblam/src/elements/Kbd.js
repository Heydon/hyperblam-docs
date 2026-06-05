import { Set } from '../primitives/Set.js';

class Kbd extends Set {
  constructor() {
    super();
    this.defaultFrom = () => [window];
    this.defaultEvent = 'keydown';
  }

  handle(event, value) {
    let match = event.key === this.key;
    let focused = document.activeElement;
    let input = focused.tagName === 'TEXTAREA' || focused.type === 'text';
    if (match && !input) {
      event.preventDefault();
      super.handle(event, value)
    }
  }

  get key() {
    return this.getAttribute('key') || ' '; // default to spacebar
	}

	set key(value) {
		this.setAttribute('ramp', value);
  }
}

export { Kbd }

