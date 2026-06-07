import { Template } from '../primitives/Template.js';

class Watch extends Template {
  onblamready() {
    super.onblamready();
    this.watchProps(
      this.fromElems, 
      (list, observer) => this.handle(list, observer), 
      this.allowed,
      true
    );
  }

  handle(list, observer) {
    if (this.bypass) return;
    for (const mutation of list) {
      if (mutation.type === 'attributes') {
        const data = {
          name: mutation.attributeName,
          oldValue: mutation.oldValue,
          newValue: mutation.target[mutation.attributeName],
          id: mutation.target.id ? `#${mutation.target.id}` : mutation.target.nodeName.toLowerCase(),
          time: this.context().currentTime.toFixed(2)
        };
        this.interpolate(this.template, data);
      }
    }
  }

  get allowed() {
    let value = this.getAttribute('allowed');
		return value ? value.split(' ') : undefined;
	}

	set allowed(value) {
		this.setAttribute('allowed', value);
  }
}


export { Watch }