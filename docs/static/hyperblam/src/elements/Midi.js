import { Base } from '../primitives/Base.js';
import { define } from '../tools/define.js';

class Midi extends Base {
  onmidimessage(event) {
    let data = {};
    data.device = event.currentTarget.name;
    data.message = event.data;
    let type = data.message[0];
    let suffix = '';
    let isOn = this.between(type, 144, 159);
    if (isOn) {
      data.channel = type - 144 + 1;
      data.note = data.message[1];
      suffix = 'On';
    }
    this.fire(
      suffix ? `midi${suffix}` : 'midi',
      data,
      this
    );
  }

  async getMIDI() {
    try {
      this.midi = await navigator.requestMIDIAccess();
      this.listen();
    } catch (err) {
      console.warn('MIDI access not granted');
    }
  }  

  async listen() {
    for (const input of this.midi.inputs.values()) {
      console.info(`MIDI input/device “${input.name}” connected`);
      input.addEventListener('midimessage', this);
    }
    this.midi.addEventListener('statechange', this.listen.bind(this));
  }

  connectedCallback() {
    this.getMIDI();
  }

  static {
    define(this);
  }
}

export { Midi }