import { Handle } from '../primitives/Handle.js';

class Bank extends Handle {
	constructor() {
		super();
    this.samples = [];
    
    this.defaultFor = ['blamready'];
    this.defaultFrom = () => [window];
    this.defaultTo = () => [this];

    this.addEventListener('blamsource', this);
	}

  handleEvent(event) {
    if (this.for.includes(event.type)) {
      this.initBuffers();
    }
    if (event.type === 'blamsource') {
      this.samples.push(event.detail);
      if (this.samples.length === this.sampleElems.length) {
        // ↓ Use index to put samples back in order of source
        this.samples.sort(({index:a}, {index:b}) => a - b);
      }
    }
  }

  async initBuffers() {
    this.sampleElems = [...this.querySelectorAll(`sample-blam`)];
    const samples = this.sampleElems.map((e, i) => e.fileToBuffer(i));
    await Promise.all(samples);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('blamsource', this);
  }
}

export { Bank }