import { Base } from './Base.js';

class WithParams extends Base {
  constructor() {
    super();
    this.c = this.context();
    this.params = {};
    this.conversions = {
      beats: value => value * this.beat
    }
  }

  mirrorParams(params) {
    this.params = Object.assign(this.params, params);
    for (const name of Object.keys(this.params)) {
      this.setParam(name, this[name]);
    }
    this.fire(
      'blamparams', 
      {
        elem: this, 
        params: this.params
      },
      this
    )
  }

  setParam(name, value) {
    let param = this.params[name];
    let time = param.time || this.getTime();
    delete param.time;
    let ramp = param.ramp;
    delete param.ramp;
    let converted = this.convertValue(name, value);
    if (isFinite(converted)) {
      if (ramp) {
        param.linearRampToValueAtTime(
          converted, 
          time + (ramp * this.beat)
        );
      } else {
        param.setTargetAtTime(
          converted,
          time,
          // ↓ Suppress clicking/popping with slight ease
          0.005
        );
      }
    } else {
      this.params[name][name] = value;
    }
  }

  attributeChangedCallback(name, _, value) {
    let param = this.params[name];
    if (param) {
      this.setParam(name, value);
    }
  }
}

export { WithParams }