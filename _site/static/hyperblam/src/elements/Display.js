import { Base } from '../helpers/Base.js';
import { define } from '../helpers/define.js';

class Display extends Base {
  render() {
    this.textContent = this.elem[this.prop];
  }

  get element() {
		return this.getAttribute('element');
	}

	set element(value) {
		if (value) {
			this.setAttribute('element', value);
    }
  }

  get prop() {
		return this.getAttribute('prop');
	}

	set prop(value) {
		if (value) {
			this.setAttribute('prop', value);
    }
  }

  connectedCallback() {
    this.elem = document.querySelector(this.element) || this.parentNode;
    this.render();
    this.watchProp(
      [this.elem], 
      _ => this.render(),
      [this.prop]
    );
  }

  static {
    define(this);
  }
}

export { Display }