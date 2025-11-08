import { Base } from '../helpers/Base.js';
import { define } from '../helpers/define.js';

class Sample extends Base {
  async fileToBuffer() {
    if (!this.src) {
      return;
    }
    const sound = await fetch(this.src);
    const arrayBuffer = await sound.arrayBuffer();
    const buffer = await this.context().decodeAudioData(arrayBuffer);
    buffer.src = this.src;
    const fileName = /[^/]*$/.exec(this.src)[0];
    buffer.id = this.id ? this.id : fileName.substring(0, fileName.indexOf('.'));
    this.id = buffer.id;
    buffer.root = this.root;
    this.fire('sample', buffer, this);
  }

  get src() {
		return this.getAttribute('src');
	}

  get root() {
		return this.getAttribute('root') || 'C4';
	}

	set root(value) {
		if (value) {
			this.setAttribute('root', value);
    }
  }

  static {
    define(this);
  }
}

export { Sample }