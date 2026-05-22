import { Handle } from '../primitives/Handle.js';
import { define } from '../tools/define.js';

class Log extends Handle {
  onblamready() {
    super.onblamready();
    if (this.cumulative) {
      this.setAttribute('role', 'list');
    }
  }

  handle(event) {
    let eventData = event?.detail;
    if (!eventData) {
      return;
    }
    let data = this.prop ? eventData[this.prop] : eventData;
    if (!this.cumulative) {
      this.innerHTML = ''; 
    } 
    this.innerHTML += `
      <span ${this.cumulative ? 'role="listitem"' : ''}>
        ${typeof data === 'object' ? JSON.stringify(data): data}
      </span>
    `;
  }

  get cumulative() {
		return this.hasAttribute('cumulative');
	}

	set cumulative(value) {
		this.toBoolean('cumulative', value);
	}

  static {
    define(this);
  }
}


export { Log }