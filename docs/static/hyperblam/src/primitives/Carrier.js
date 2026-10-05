import { Operator } from './Operator.js';
import { nameToNum } from '../tools/nameToNum.js';
import { random } from '../tools/random.js';

class Carrier extends Operator {
  constructor() {
    super();
    this.setAttribute('data-input-blam', '');
  }

  onblamready() {
    super.onblamready();
    this.gainNode.connect(this.getOut().inNode);
  }

  getNote(note) {
    if (!note) {
      if (!this.robin) {
        return random.oneOf(this.notes);
      } else {
        this.prevNoteIndex = this.nextIndex(this.prevNoteIndex, this.notes);
        return this.notes[this.prevNoteIndex];
      }
    }
    return note;
  }

  setFreq(node, note) {
    let num = nameToNum(this.getNote(note));
    node.frequency.value = 440 * Math.pow(2, (num - 69) / 12);
  }

  get notes() {
		let value = this.getAttribute('notes');
    return value ? value.split(' ') : ['C4', 'D#4', 'G4'];
	}

	set notes(value) {
		this.setAttribute('notes', value);
  }

  get out() {
    return this.getAttribute('out');
	}

	set out(value) {
		this.setAttribute('out', value);
  }

  get robin() {
		return this.hasAttribute('robin');
	}

	set robin(value) {
		this.toBoolean('robin', value);
	}
}

export { Carrier }