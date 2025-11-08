import { Event } from './Event.js';

class PropParamMethod extends Event {
  modify(event, value = this.value) {
    for (const sub of this.subElems) {
      if (this.random.chance(this.chance)) {
        let param = sub.params && sub.params[this.target];
        let time = event?.detail?.time || this.getTime();

        if (param?.setValueAtTime) {
          if (this.ramp) {
            param.linearRampToValueAtTime(
              value, 
              time + (this.ramp * this.beat)
            );
          } else {
            param.setValueAtTime(value, time);
          }
          return;
        }

        switch (typeof this.subElems[0][this.target]) {
          case 'boolean':
            sub[this.target] = !sub[this.target];
            break;
          case 'function':
            sub[this.target](value);
            break;
          default: 
            if (value) {
              sub[this.target] = value;
            }
        }
      }
    }
  }

  get ramp() {
    let value = this.getAttribute('ramp');
    return this.parse(value);
	}

	set ramp(value) {
		if (value) {
			this.setAttribute('ramp', value);
    }
  }
}

export { PropParamMethod }