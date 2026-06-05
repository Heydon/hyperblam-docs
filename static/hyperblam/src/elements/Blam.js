import { Set } from '../primitives/Set.js';

class Blam extends Set {
  constructor() {
    super();
    this.defaultFrom = () => [this.closest('[data-sampler-blam]') || this.closest('media-blam') || this.parentNode];
  }
}

export { Blam }