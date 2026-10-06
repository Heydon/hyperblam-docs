import { Operator } from '../primitives/Operator.js';
import { nameToNum } from '../tools/nameToNum.js';
import { random } from '../tools/random.js';

class Poly extends Operator {
  constructor() {
    super();
    this.setAttribute('data-input-blam', '');
  }

  onblamready() {
    super.onblamready();
    this.outNode.connect(this.getOut().inNode);
  }

  getNote(note) {
    if (!note) {
      if (!this.robin) {
        return random.oneOf(this.notes);
        console.log(note);
      } else {
        this.prevNoteIndex = this.nextIndex(this.prevNoteIndex, this.notes);
        return this.notes[this.prevNoteIndex];
      }
    }
    return note;
  }

  setFreq(note) {
    let num = nameToNum(this.getNote(note));
    return 440 * Math.pow(2, (num - 69) / 12);
  }

  get notes() {
		let value = this.getAttribute('notes');
    return value ? value.split(' ') : ['C4', 'D#4', 'G4'];
	}

	set notes(value) {
		this.setAttribute('notes', value);
  }

  get robin() {
		return this.hasAttribute('robin');
	}

	set robin(value) {
		this.toBoolean('robin', value);
	}
}

export { Poly }