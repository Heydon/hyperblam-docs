import { Handle } from './Handle.js';
import { random } from '../tools/random.js';

class Show extends Handle {
  constructor() {
    super();
    this.defaultTo = () => [this];
    this.defaultFrom = () => [this.closest('[data-sampler-blam]')];
  }

  onblamready() {
    super.onblamready();
    this.toElems.forEach(to => {
      to.slides = [...to.querySelectorAll(this.selector)];
    });
  }

  handle(event) {
    if (!random.chance(this.chance)) {
      return;
    }
    for (const to in this.toElems) {
      // ↓ Don’t operate if the ancesrtor element is hidden
      if (to.hidden) return;

      to.slides.forEach(slide => slide.hidden = true);
      let chosen;
      if (this.cycle) {
        this.prevIndex =  this.cycle(this.slides, this.prevIndex);
        chosen = to.slides[this.prevIndex];
      } else {
        chosen = this.some ? random.some(to.slides, this.some) : random.oneOf(to.slides);
      }
      chosen.forEach(slide => slide.hidden = false);
    }
  }

	get selector() {
    return this.getAttribute('selector') || ':scope > *';
	}

	set selector(value) {
		this.setAttribute('selector', value);
	}

  get some() {
    let value = this.getAttribute('some');
    return value ? parseFloat(value) : null;
	}

	set some(value) {
    this.setAttribute('some', value);
	}

  get cycle() {
		return this.hasAttribute('cycle');
	}

  set cycle(value) {
		this.toBoolean('cycle', value);
	}
}

export { Show }