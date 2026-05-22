import { Box } from '../primitives/Box.js';
import { define } from '../tools/define.js';

class Analyser extends Box {
  constructor() {
    super();
    this.node = this.context().createAnalyser();
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);
    this.node.fftSize = Math.max(this.bands, 16) * 2;
    this.node.smoothingTimeConstant = this.smoothing;
    this.dataFrequencies = new Uint8Array(this.bands);
    this.dataTime = new Uint8Array(this.bands);
  }

  getFrequencyData() {
    this.node.getByteFrequencyData(this.dataFrequencies);
    return this.dataFrequencies;
  }

  getTimeData() {
    this.node.getByteTimeDomainData(this.dataTime);
    return this.dataTime;
  }

  get bands() {
    let value = this.getAttribute('bands');
		return value ? parseFloat(value) : 16;
	}

	set bands(value) {
		this.setAttribute('bands', value);
  }

  get smoothing() {
    let value = this.getAttribute('smoothing');
		return value ? parseFloat(value) : 0;
	}

	set smoothing(value) {
		this.setAttribute('smoothing', value);
  }

  static {
    define(this);
  }
}

export { Analyser }