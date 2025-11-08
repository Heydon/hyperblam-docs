import { PropParamMethod } from '../helpers/PropParamMethod.js';
import { define } from '../helpers/define.js';

class Tap extends PropParamMethod {
  constructor() {
    super();
    this.defaultPubs = () => [this.querySelector('button')];
    this.defaultEvent = 'click';
  }

  handleEvent(event) {
    if (event.type === this.event) {
      super.modify(event);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.button = this.pubElems[0];
  }

  static {
    define(this);
  }
}

export { Tap }