import { Template } from '../primitives/Template.js';

class Log extends Template {
  onblamready() {
    super.onblamready();
    this.listen();
  }

  handle(event) {
    let data = event?.detail;
    if (!data) return;
    this.interpolate(this.template, data);
  }
}

export { Log }