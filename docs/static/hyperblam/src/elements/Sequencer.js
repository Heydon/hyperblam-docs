import { Base } from '../primitives/Base.js';
import { random } from '../tools/random.js';

class Sequencer extends Base {
  constructor() {
    super();
    this.playing = false;
    this.odd = 1;
    this.c = this.context();
  }

  schedule() {
    while (this.time < this.c.currentTime + 0.1) {
      this.odd = this.odd === 0 ? 1 : 0;
      this.time += this.quarterBeat * this.scale;
      this.trackElems && this.trackElems.forEach(t => {
        let b = t.getBar();
        t.probable = !t.suspend && random.chance(Math.max(b.chance || t.chance));
        t.cipher = b.getCipher(t.step);
      });
      this.fire('blam', {
        sequencer: this,
        tracks: this.trackElems,
        time: this.odd ? this.time : this.time + (this.quarterBeat * this.swing) 
      }, this, false);
    }
  }

  play() {
    this.playing = true; 
    this.c.resume();
    this.time = this.c.currentTime;
    this.scheduling = setInterval(this.schedule.bind(this), 25);
    this.fire('blamplay', {}, this);
  }

  pause() {
    this.playing = false;
    clearInterval(this.scheduling);
    this.fire('blamstop', {}, this);
  }

  stop() {
    this.pause();
    this.odd = 1;
    this.trackElems.length && this.trackElems.forEach(t => t.reset());
    this.fire('blamstop', {}, this);
  }

  playPause() {
    this.playing ? this.pause() : this.play();
  }

  playStop() {
    this.playing ? this.stop() : this.play();
  }

  get bpm() {
    let value = this.getAttribute('bpm');
		return value ? parseFloat(value) : 120;
	}

	set bpm(value) {
		this.setAttribute('bpm', value);
  }

  get swing() {
    let value = this.getAttribute('swing');
    if (value === '') {
      return 0.333;
    }
    if (value === null) {
      return 0;
    }
    return parseFloat(value);
	}

	set swing(value) {
		if (typeof value === 'number' && value !== 0) {
			return this.setAttribute('swing', value);
    }
    if (value) {
      return this.setAttribute('swing', '');
    }
    this.removeAttribute('swing');
  }

  get scale() {
    let value = this.getAttribute('scale');
    return value ? parseFloat(value) : 1;
	}

	set scale(value) {
		this.setAttribute('scale', value);
  }

  connectedCallback() {
    this.trackElems = [...this.querySelectorAll('track-blam')];
  }
}

export { Sequencer }