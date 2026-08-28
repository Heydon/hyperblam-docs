import { Visualiser } from './Visualiser.js';
import { random } from '../tools/random.js';

class BandsToProps extends Visualiser {
  createIndices(count) {
    this.unshuffled = Array(this.analyserElem.bands)
      .fill().map((_, i) => i + 1)
      .slice(
        this.first ? this.first - 1 : undefined, 
        this.last || undefined
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
    this.style.setProperty(`--${this.name}-interval`, `${this.ms / 1000}s`);
    const properties = [];
    for (let i = 0; i < this.data.length; i++) {
      let key = `--${this.name}-freq-${i + 1}`;
      let val = this.data[i] / 255;
      properties.push([key, val]);
      this.style.setProperty(key, val);
    }
    this.fire('blam', {
      data: this.data,
      css: properties.map(p => p.join(': ')).join(';\n') + ';'
    }, this);
  }

  get shuffle() {
		return this.hasAttribute('shuffle');
	}

	set shuffle(value) {
		this.toBoolean('shuffle', value);
	}

  get first() {
    return this.getAttribute('first');
	}

	set first(value) {
		this.setAttribute('first', value);
  }

  get last() {
    return this.getAttribute('last');
	}

	set last(value) {
		this.setAttribute('last', value);
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