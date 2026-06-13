import { Frame } from '../primitives/Frame.js';

class Rings extends Frame {
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

        svg {
          overflow: visible;
          aspect-ratio: 1 / 1;
          max-inline-size: 100cqw;
          max-block-size: 100cqh;
          fill: none;
          stroke: currentColor;
        }

        circle {
          transform-origin: center;
          transform: scale(${band});
          mix-blend-mode: difference;
          transition: transform ${interval} linear;
        }
      </style>
      <svg viewBox="0 0 100 100">
        ${this.renderItems()}
      </svg>
    `;
  }

  renderItem(i) {
    return `
      <circle cx="50" cy="50" r="50" style="${this.declaration(i)}"></circle>
    `;
  }
}

export { Rings }