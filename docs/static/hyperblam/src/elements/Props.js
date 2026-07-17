import { BandsToProps } from '../primitives/BandsToProps.js';

class Props extends BandsToProps {
	init() {
    this.bandElems = [...this.querySelectorAll(this.selector)];
		this.bandElems.length && this.distribute(this.bandElems);
  }

	distribute() {
		let indices = this.createIndices(this.bandElems.length);
		this.bandElems.forEach((b, i) => {
      b.style.setProperty(`--${this.name}-freq`, `var(--${this.name}-${indices[i]})`);
    });
	}

	get selector() {
    return this.getAttribute('selector') || null;
	}

	set selector(value) {
		this.setAttribute('selector', value);
	}
}

export { Props }