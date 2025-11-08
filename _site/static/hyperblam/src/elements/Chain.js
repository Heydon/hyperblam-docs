import { Box } from '../helpers/Box.js';
import { define } from '../helpers/define.js';

class Chain extends Box {
  constructor() {
    super();
    this.isChain = true;
  }

  onblamready() {
    this.connectBoxes();
  }
  
  connectBoxes() {  
    this.allBoxElems = [...this.children];
    if (!this.allBoxElems.length) {
      this.inNode.connect(this.wetGainNode)
                 .connect(this.outNode); 
    } else {
      this.inNode.connect(this.allBoxElems[0].inNode);
      for (const boxElem of this.allBoxElems) {
        let boxNext = boxElem.nextElementSibling;
        boxNext && boxElem.outNode.connect(boxNext.inNode);
      }
      this.allBoxElems.at(-1).outNode.connect(this.wetGainNode)
                                    .connect(this.outNode);
    }
    this.outElem = this.getOut();
    this.outNode.connect(this.outElem.inNode); 
  }

  get out() {
    let value = this.getAttribute('out');
		return this.parse(value, 0);
	}

	set out(value) {
		if (value) {
			this.setAttribute('out', value);
    }
  }

  static {
    define(this);
  }
}

export { Chain }