import { Visualiser } from './Visualiser.js';
import { random } from '../tools/random.js';

class BandsToProps extends Visualiser {
  constructor() {
    super();
    this.propsRoot = this;
  }

  createIndices(count) {
    this.unshuffled = Array(this.analyserElem.bands)
      .fill().map((_, i) => i + 1)
      .slice(
        this.first ? this.first - 1 : undefined, 
        this.last ? this.last : undefined
      );
    let indices = [];
    for(let i = 0; i < count; i++) {
      let chunk = this.shuffle ? this.shuffleBands() : this.unshuffled;
      indices.push(chunk[i%chunk.length]);
    }
    return indices;
  }

  shuffleBands() {
    let toShuffle = this.unshuffled.slice();
    return random.shuffle(toShuffle);
  }

  translate() {
    this.propsRoot.style.setProperty(`--${this.name}-interval`, `${this.ms / 1000}s`)
    for (let i = 0; i < this.data.length; i++) {
      this.propsRoot.style.setProperty(`--${this.name}-${this.type}-${i + 1}`, this.data[i] / 255);
    }
    this.propsRoot.style.setProperty(`--${this.name}-${this.type}`, this.getAverage(this.data) / 255);
  }

  get shuffle() {
		return this.hasAttribute('shuffle');
	}

	set shuffle(value) {
		this.toBoolean('shuffle', value);
	}

  static get observedAttributes () {
    return ['shuffle'];
  }

  attributeChangedCallback(name) {
    if (name === 'shuffle') {
      if (this.connected) {
        this.distribute(this.bandElems);
      }
    }
  }

  connectedCallback() {
    this.connected = true;
  }
}

export { BandsToProps }