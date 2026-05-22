import { Set } from '../primitives/Set.js';
import { define } from '../tools/define.js';

class Switch extends Set {
  constructor() {
    super();
    this.defaultFrom = () => [this.querySelector('[type="checkbox"]')];
    this.defaultEvent = 'input';
  }

  onblamready() {
    super.onblamready();
    this.input = this.fromElems[0];
    this.initial = this.toElems[0][this.prop];
    let state = this.value ? this.value === this.initial : !!this.initial;
    this.input.checked = this.reverse ? !state : state;
    this.watchProp(
      this.toElems, 
      to => this.sync(to),
      [this.prop]
    );
  }

  sync(to) {
    let toValue = to[0].target[this.prop];
    let fromValue = this.convertValue(this.prop, this.value, to[0].target);
    let state = this.value ? fromValue === toValue : !!toValue;
    this.input.checked = this.reverse ? !state : state;
  }

  handle(event) {
    let value;
    if (!this.value) {
      value = event.target.checked;
    } else {
      value = event.target.checked ? this.value : this.initial;
    }
    super.handle(event, value);
  }

  get reverse() {
		return this.hasAttribute('reverse');
	}

	set reverse(value) {
		this.toBoolean('reverse', value);
	}

  static {
    define(this);
  }
}

export { Switch }