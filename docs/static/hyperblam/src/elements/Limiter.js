import { Box } from '../primitives/Box.js';

class Limiter extends Box {
  constructor() {
    super();
    this.mixInitial = 1;

    this.node = this.c.createDynamicsCompressor();
    let time = this.c.currentTime;
    this.node.threshold.setValueAtTime(-0.5, time);
    this.node.knee.setValueAtTime(0, time);
    this.node.ratio.setValueAtTime(20, time);
    this.node.attack.setValueAtTime(0.001, time);
    this.node.release.setValueAtTime(0.05, time);
    this.inNode.connect(this.node)
               .connect(this.wetGainNode);
  }
}

export { Limiter }