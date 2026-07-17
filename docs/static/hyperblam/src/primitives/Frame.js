import { BandsToProps } from './BandsToProps.js';

class Frame extends BandsToProps {
  constructor() {
		super();
		this.attachShadow({ mode: 'open' });
    this.propsRoot = this.shadowRoot.host;
	}

  onblamready() {
    super.onblamready();
    this.init();
  }

  render(band, interval, ratio) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          container-type: size;
          aspect-ratio: ${ratio};
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 1cqw;
        }

        :host > * {
          flex-grow: 1;
          block-size: 100cqh;
          transform: scaleY(${band});
          transition: transform ${interval} linear;
          background-color: #fff;
        }
      </style>
      ${this.renderItems()}
    `;
  }

  init() {
    let band = `var(--${this.name}-freq)`;
    let interval = `var(--${this.name}-interval)`;
    this.render(band, interval, this.ratio, this.count);
  }

  declaration(i) {
    return `--${this.name}-freq: var(--${this.name}-freq-${i}, 0)`;
  }

  renderItems() {
    let indices = this.createIndices(this.count);
    let items = [];
    for (let i = 0; i < this.count; i++) {
      items.push(this.renderItem(indices[i]));
    }
    return items.join('\n');
  }

  renderItem(i) {
    return `
      <div style="${this.declaration(i)}"></div>
    `;
  }

  get count() {
    let value = this.getAttribute('count');
    return value ? parseFloat(value) : 16;
	}

	set count(value) {
		this.setAttribute('count', value);
	}

  get ratio() {
    return this.getAttribute('ratio') || '16 / 9';
	}

	set ratio(value) {
		this.setAttribute('ratio', value);
	}
}

export { Frame }