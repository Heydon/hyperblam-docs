import { PropParamMethod } from '../helpers/PropParamMethod.js';
import { define } from '../helpers/define.js';

class Switch extends PropParamMethod {
  constructor() {
    super();
    this.defaultPubs = () => [this.querySelector('[type="checkbox"]')];
    this.defaultEvent = 'input';
  }

  sync() {
    this.input.checked = this.value === this.subElems[0][this.target];
  }

  handleEvent(event) {
    if (event.type === this.event) {
      let value = (event.target.checked && this.value) || 
        (!event.target.checked && this.initial) ||
        event.target.checked;
      super.modify(event, value);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.input = this.pubElems[0];
    this.initial = this.subElems[0][this.target];
    this.input.checked = this.value ? this.value === this.initial : this.initial;
    this.watchProp(
      this.subElems, 
      _ => this.sync(),
      [this.target]
    )
  }

  static {
    define(this);
  }
}

export { Switch }