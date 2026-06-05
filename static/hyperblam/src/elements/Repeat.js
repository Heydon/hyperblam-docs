import { Base } from '../primitives/Base.js';

class Repeat extends Base {
  constructor() {
    super();
    this.repeat = true;
  }
  
  get x() {
    let value = this.getAttribute('x');
    return value ? parseFloat(value) : 1;
	}

	set x(value) {
		this.setAttribute('x', value);
  }
}

export { Repeat }