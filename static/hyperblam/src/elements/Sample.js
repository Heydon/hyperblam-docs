import { Base } from '../primitives/Base.js';
import { define } from '../tools/define.js';

class Sample extends Base {
  reverseClone(b) {
    let newB = new AudioBuffer({
      length: b.length, 
      numberOfChannels: b.numberOfChannels, 
      sampleRate: b.sampleRate
    });
    for(let c = 0; c < newB.numberOfChannels; ++c) {
      let oldData = b.getChannelData(c);
      let newData = newB.getChannelData(c);
      newData.set(oldData);
      Array.prototype.reverse.call(newB.getChannelData(c));
    }
    return newB;
  }

  async fileToBuffer(i) {
    if (!this.src) {
      return;
    }
    const sound = await fetch(this.src);
    const arrayBuffer = await sound.arrayBuffer();
    const buffer = await this.context().decodeAudioData(arrayBuffer);
    const fileName = /[^/]*$/.exec(this.src)[0];
    this.id = this.id || fileName.substring(0, fileName.indexOf('.'));
    const reversed = this.reverse ? this.reverseClone(buffer) : null;
    this.fire(
      'blamsource', 
      {
        file: fileName,
        id: this.id,
        index: i + 1,
        root: this.root,
        buffer,
        reversed
      }, 
      this,
      true
    );
  }

  get src() {
		return this.getAttribute('src');
	}

  get reverse() {
		return this.hasAttribute('reverse');
	}

	set reverse(value) {
		this.toBoolean('reverse', value);
	}

  get root() {
		return this.getAttribute('root') || 'C4';
	}

	set root(value) {
		this.setAttribute('root', value);
  }

  static {
    define(this);
  }
}

export { Sample }