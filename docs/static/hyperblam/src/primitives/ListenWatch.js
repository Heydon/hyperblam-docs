import { Handle } from './Handle.js';

class ListenWatch extends Handle {
  constructor() {
    super();
    this.defaultMode = ['events', 'props'];
    this.defaultFor = ['blam', 'any'];
  }

  listen() {
    this.mode.includes('events') && super.listen();
    this.watcher = this.mode.includes('props') && this.watchProps(
      this.fromElems, 
      (list, observer) => this.handleWatch(list, observer), 
      this.for.includes('any') ? undefined : this.for
    );
  }

  unlisten() {
    this.watcher && this.watcher.disconnect();
    this.mode.includes('events') && super.unlisten();
  }

  get mode() {
    let value = this.getAttribute('mode');
    return value ? value.split(' ') : this.defaultMode;
	}

	set mode(value) {
		this.setAttribute('mode', value);
  }
}

export { ListenWatch }
