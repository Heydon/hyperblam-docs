import { Sampler } from '../primitives/Sampler.js';
import { define } from '../tools/define.js';
import { nameToNum } from '../tools/nameToNum.js';
import { random } from '../tools/random.js';

class Notes extends Sampler {
  constructor() {
    super();
    this.tonal = true;
  }

  assignBuffer(cipher) {
    if (cipher === 0) {
      this.sound = null;
      return;
    }
    this.sound = this.prevSound = this.newItem(this.prevSound, this.bankElem.sounds);
  }

  getNote(note) {
    if (!note) {
      if (!this.robin) {
        return random.oneOf(this.notes);
      } else {
        this.prevNote = this.cycle(this.prevNote, this.notes);
        return this.prevNote;
      }
    }
    return note;
  }

  prePlay(note) {
    super.prePlay();
    this.noteNum = nameToNum(this.getNote(note));
    this.rootName = this.instance.root || this.root;
    this.rootNum = nameToNum(this.rootName);
    let rate = 2 ** ((this.noteNum - this.rootNum) / 12);
    this.instance.node.playbackRate.value = rate;
  }

  get root() {
		return this.getAttribute('root') || 'C4';
	}

	set root(value) {
		this.setAttribute('root', value);
  }

  get notes() {
		let value = this.getAttribute('notes');
    return value ? value.split(' ') : ['C4', 'D#4', 'G4'];
	}

	set notes(value) {
		this.setAttribute('notes', value);
  }

  static {
    define(this);
  }
}

export { Notes }