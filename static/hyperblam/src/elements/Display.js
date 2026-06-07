import { Base } from '../primitives/Base.js';

class Display extends Base {
  render() {
    let value = this.elem[this.prop];
    this.textContent = isNaN(value) ? value : parseFloat(value).toFixed(this.places);
  }

  get element() {
		return this.getAttribute('element');
	}

	set element(value) {
		this.setAttribute('element', value);
  }

  get prop() {
		return this.getAttribute('prop');
	}

	set prop(value) {
		this.setAttribute('prop', value);
  }

  get places() {
    let value = this.getAttribute('places');
		return value ? parseFloat(value) : 0;
	}

	set places(value) {
		this.setAttribute('places', value);
  }

  connectedCallback() {
    this.elem = document.querySelector(this.element) || this.parentNode;
    this.render();
    this.watchProps(
      [this.elem], 
      _ => this.render(),
      [this.prop]
    );
  }
}

export { Display }