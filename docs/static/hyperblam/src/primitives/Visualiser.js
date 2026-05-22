import { Base } from '../primitives/Base.js';

class Visualiser extends Base {
  onblamready() {
    this.type = this.time ? 'time' : 'freq';
    this.analyserElem = document.querySelector('analyser-blam');
    this.name = this.id || this.analyserElem.id || this.parentNode.outerHTML.length;
    this.transportElem = this.transport ? document.querySelector(this.transport) : this.closest('sequencer-blam');
    this.transportElem.addEventListener('blamplay', this);
    this.transportElem.addEventListener('blamstop', this);
    this.function = this.time ? 'getTimeData' : 'getFrequencyData';
    this.init && this.init();
  }

  getAverage() {
    let sum = 0;
    for (const band of this.data) {
      sum += band * band;
    }  
    return Math.sqrt(sum / this.data.length);
  }

  translate() {
    console.log(this.data);
  }

  onblamplay() {
    this.setAttribute('data-playing', '');
    this.logger = setInterval(() => {
      this.data = this.analyserElem[this.function]()
      this.translate();
      if (this.stopping) {
        if (this.data.every(datum => datum == 0)) {
          clearInterval(this.logger);
          this.removeAttribute('data-playing');
          this.stopping = false;
        }
      }
    }, 1000 / this.fps);
  }

  onblamstop() {
    this.stopping = true;
  }

  get analyser() {
    return this.getAttribute('analyser');
	}

	set analyser(value) {
		this.setAttribute('analyser', value);
  }

  get transport() {
    return this.getAttribute('transport');
	}

	set transport(value) {
		this.setAttribute('transport', value);
  }

  get fps() {
    let value = this.getAttribute('fps');
		return value ? parseFloat(value) : 25;
	}

	set fps(value) {
		this.setAttribute('fps', value);
  }

  get first() {
    return this.getAttribute('first');
	}

	set first(value) {
		this.setAttribute('first', value);
  }

  get last() {
    return this.getAttribute('last');
	}

	set last(value) {
		this.setAttribute('last', value);
  }

  get ms() {
    return 1000 / this.fps;
  }

  get time() {
		return this.hasAttribute('time');
	}

	set time(value) {
		this.toBoolean('time', value);
	}

  disconnectedCallback() {
    this.transportElem.removeEventListener('blamplay');
    this.transportElem.removeEventListener('blamstop');
  }
}

export { Visualiser }