import { Base } from '../helpers/Base.js';
import { define } from '../helpers/define.js';

class Sequencer extends Base {
  constructor() {
    super();
    this.playing = false;
    this.odd = 1;
  }

  schedule() {
    while (this.time < this.context().currentTime + 0.1) {
      this.odd = this.odd === 0 ? 1 : 0;
      this.time += this.quarterBeat;
      this.trackElems && this.trackElems.forEach(t => {
        t.probable = !t.suspend && this.random.chance(t.chance);
        t.cipher = t.barElems[t.bar].getCipher(t.step);
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
    this.context().resume();
    this.time = this.context().currentTime;
    this.scheduling = setInterval(this.schedule.bind(this), 25);
  }

  pause() {
    this.playing = false;
    clearInterval(this.scheduling);
  }

  stop() {
    this.pause();
    this.odd = 1;
    this.trackElems.length && this.trackElems.forEach(t => t.reset());
  }

  playPause() {
    this.playing ? this.pause() : this.play();
  }

  playStop() {
    this.playing ? this.stop() : this.play();
  }

  get bpm() {
    let value = this.getAttribute('bpm');
		return this.parse(value, 120);
	}

	set bpm(value) {
		if (value) {
			this.setAttribute('bpm', value);
    }
  }

  get swing() {
    let value = this.getAttribute('swing');
    return value === '' ? 0.333 : this.parse(value, 0);
	}

	set swing(value) {
		if (value) {
			this.setAttribute('swing', value);
    }
  }

  connectedCallback() {
    this.trackElems = [...this.querySelectorAll('track-blam')];
  }

  static {
    define(this);
  }
}

export { Sequencer }