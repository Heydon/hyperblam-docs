import { Template } from '../primitives/Template.js';

class Log extends Template {
  handle(event) {
    let data = event?.detail || {};
    data.name = event.type; 
    data.target = event.target;
    data.id = event.target.id ? `#${event.target.id}` : event.target.nodeName.toLowerCase();
    this.interpolate(this.template, data);
    this.defaultMode = ['events'];
  }

  handleWatch(list, observer) {
    if (this.bypass) return;
    for (const record of list) {
      const data = {
        name: record.attributeName,
        target: record.target,
        id: record.target.id ? `#${record.target.id}` : record.target.nodeName.toLowerCase(),
        value: record.target[record.attributeName],
        oldValue: record.oldValue,
        time: this.context().currentTime
      };
      this.interpolate(this.template, data);
    }
  }
}

export { Log }