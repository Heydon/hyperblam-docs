import { Set } from '../primitives/Set.js';
import { define } from '../tools/define.js';

class Radios extends Set {
  constructor() {
    super();
    this.defaultFrom = () => [this.querySelector('fieldset')];
    this.defaultEvent = 'change';
  }

  onblamready() {
    super.onblamready();
    this.fieldset = this.fromElems[0];
    this.radios = [...this.fieldset.querySelectorAll('[type="radio"]')];
    this.initial = this.toElems[0][this.prop];
    this.active = this.radios.find(r => this.stringNumBool(r.value) === this.initial);
    if (this.active) {
      this.active.checked = true;
    }
    this.watchProp(
      this.toElems, 
      to => this.sync(to),
      [this.prop]
    );
  }

  sync(to) {
    let value = to[0].target[this.prop];
    this.active = this.radios.find(r => this.stringNumBool(r.value) === value);
    if (this.active) {
      this.active.checked = true;
    }
  }

  handle(event) {
    let value = this.stringNumBool(event.target.value);
    super.handle(event, value);
  }

  static {
    define(this);
  }
}

export { Radios }