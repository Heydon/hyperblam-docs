import { Player } from '../helpers/Player.js';
import { define } from '../helpers/define.js';

class Notes extends Player {
  assignBuffer(cipher) {
    if (cipher === null) {
      return null;
    }
    return this.newItem(this.prevSound, this.sounds);
  }

  getNote(note) {
    if (note === undefined) {
      if (!this.robin) {
        return this.random.oneOf(this.notes);
      } else {
        this.prevNote = this.cycle(this.prevNote, this.notes);
      }
    }
    return note;
  }

  prePlay(note) {
    super.prePlay();

    this.noteNum = this.nameToNum(this.getNote(note));
    this.rootName = this.instance.node.buffer.root || this.root;
    this.rootNum = this.nameToNum(this.rootName);
    let rate = 2 ** ((this.noteNum - this.rootNum) / 12);
    this.instance.node.playbackRate.value = rate;
  }

  get root() {
		return this.getAttribute('root') || 'C4';
	}

	set root(value) {
		if (value) {
			this.setAttribute('root', value);
    }
  }

  get notes() {
		let value = this.getAttribute('notes');
    return value ? value.split(' ') : ['C4', 'D#4', 'G4'];
	}

	set notes(value) {
		if (value) {
			this.setAttribute('notes', value);
    }
  }

  static {
    define(this);
  }
}

export { Notes }