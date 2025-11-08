import { Base } from './Base.js';

class Event extends Base {
  constructor() {
    super();
    this.defaultPubs = () => [this.closest('[data-player-blam]')];
    this.defaultSubs = () => [this.parentNode];
    this.defaultEvent = 'blam';
  }

  handleEvent(event) {
    if (event.type === this.event && !this.suspend) {
      this.modify(event);
    } else {
      super.handleEvent(event);
    }
  }

  listen() {
    for (const pub of this.pubElems) {
      pub.addEventListener(this.event, this);
    }
  }

  unlisten() {
    for (pub of this.pubElems) {
      pub.removeEventListener(this.event, this);
    }    
  }

  get pubs() {
    return this.getAttribute('pubs');
	}

	set pubs(value) {
		if (value) {
			this.setAttribute('pubs', value);
    }
  }  

  get subs() {
    return this.getAttribute('subs');
	}

	set subs(value) {
		if (value) {
			this.setAttribute('subs', value);
    }
  }

  get value() {
    let value = this.getAttribute('value');
		return this.parse(value);
	}

	set value(value) {
		if (value) {
			this.setAttribute('value', value);
    }
  }

  get event() {
    return this.getAttribute('event') || this.defaultEvent;
	}

	set event(value) {
		if (value) {
			this.setAttribute('event', value);
    }
  }

  get target() {
    return this.getAttribute('target');
	}

	set target(value) {
		if (value) {
			this.setAttribute('target', value);
    }
  }

  get suspend() {
		return this.hasAttribute('suspend');
	}

	set suspend(value) {
		this.toBoolean('suspend', value);
	}

  get chance() {
    let value = this.getAttribute('chance');
    return this.parse(value, 1);
	}

	set chance(value) {
		if (value) {
			this.setAttribute('chance', value);
    }
  }

  connectedCallback() {
    this.pubElems = this.pubs ? [...document.querySelectorAll(this.pubs)] : this.defaultPubs();
    this.subElems = this.subs ? [...document.querySelectorAll(this.subs)] : this.defaultSubs();
    this.listen();
  }

  disconnectedCallback() {
    this.unlisten();
  }
}

export { Event }