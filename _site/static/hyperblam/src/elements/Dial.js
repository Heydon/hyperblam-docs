import { PropParamMethod } from '../helpers/PropParamMethod.js';
import { define } from '../helpers/define.js';

class Dial extends PropParamMethod {
  constructor() {
    super();
    this.defaultPubs = () => [this.querySelector('[type="number"], [type="range"]')];
    this.defaultEvent = 'input';
  }

  sync(subs) {
    this.input.value = subs[0].target[subs[0].attributeName];
  }

  handleEvent(event) {
    if (event.type === this.event) {
      this.value = event.target.value;
      super.modify(event);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.input = this.pubElems[0];
    this.input.value = this.subElems[0][this.target]; 
    this.watchProp(
      this.subElems, 
      subs => this.sync(subs),
      [this.target]
    )
  }

  static {
    define(this);
  }
}

export { Dial }