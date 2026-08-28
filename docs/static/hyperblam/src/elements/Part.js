import { Base } from '../primitives/Base.js';

class Part extends Base {
  onblamready() {
    this.track = this.closest('track-blam');
    let bits = [...this.querySelectorAll(':scope > :where(bar-blam, repeat-blam)')];
    this.indices = this.track.createIndices(bits);
  }
}

export { Part }