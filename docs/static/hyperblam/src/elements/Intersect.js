import { Base } from '../primitives/Base.js';

class Intersect extends Base {
  buildThresholds(steps) {
    let thresholds = [];
  
    for (let i = 1.0; i <= steps; i++) {
      let ratio = i / steps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }

  handler(entries) {
    let intersecting = entries[0].isIntersecting;
    let change = intersecting === this.wasIntersecting;
    this.fire('blam', {
      x: entries[0].intersectionRatio,
      on: intersecting,
      switch: change
    }, this);
    this.wasIntersecting = intersecting;
  }

  get root() {
		return this.getAttribute('root');
	}

	set root(value) {
		if (value) {
			this.setAttribute('root', value);
    }
  }

  get steps() {
    let value = this.getAttribute('steps');
		return value ? parseFloat(value) : 10;
	}

	set steps(value) {
		if (value) {
			this.setAttribute('steps', value);
    }
  }

  get margin() {
		return this.getAttribute('margin') || '0px';
	}

	set margin(value) {
		if (value) {
			this.setAttribute('margin', value);
    }
  }

  connectedCallback() {
    let options = {
      rootMargin: this.margin,
      threshold: this.buildThresholds(this.steps)
    };

    if (this.root) {
      options.root = document.querySelector(this.root);
    }

    this.observer = new IntersectionObserver(entries => {
      this.handler(entries);
    }, options);

    this.observer.observe(this);
  }
}

export { Intersect }