import { Base } from '../primitives/Base.js';

class Visualiser extends Base {
  onblamready() {
    this.analyserElem = document.querySelector(this.analyser || 'analyser-blam');
    this.name = this.id || this.analyserElem.id || Math.random().toString(36).substring(2, 6);
    this.transportElem = this.transport ? document.querySelector(this.transport) : this.closest('sequencer-blam');
    this.transportElem.addEventListener('blamplay', this);
    this.transportElem.addEventListener('blamstop', this);
    this.function = 'getFrequencyData';
  }

  translate() {
    console.log(this.data);
  }

  onblamplay() {
    this.logger = setInterval(() => {
      this.data = this.analyserElem[this.function]()
      this.translate();
      if (this.stopping) {
        if (this.data.every(d => d == 0)) {
          clearInterval(this.logger);
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

  get ms() {
    return 1000 / this.fps;
  }

  disconnectedCallback() {
    this.transportElem.removeEventListener('blamplay');
    this.transportElem.removeEventListener('blamstop');
  }
}

export { Visualiser }