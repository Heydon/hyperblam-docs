import { random } from '../tools/random.js';

class Base extends HTMLElement {
  constructor() {
    super();
     window.addEventListener('blamready', this, { once: true });
  }

  handleEvent(event) {
    this[`on${event.type}`] && this[`on${event.type}`](event);
  }

  fire(name, data, target = window, bubbles = false) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: bubbles
    });

    target.dispatchEvent(event);
  }

  context() {
    let closest = this.closest('audio-blam');
    return closest ? closest.audioContext : document.querySelector('audio-blam').audioContext;
  }

  getTime() {
    if (this.time) {
      return this.time;
    }
    let timeElem = this.closest(`[data-sampler-blam], sequencer-blam`);
    return timeElem?.time || this.context().currentTime;
  }

  get beat() {
    return 60 / this.closest(`audio-blam`).bpm;
	}

  get quarterBeat() {
		return 0.25 * this.beat;
	}

  getOut() {
    let idElem = this.out && document.getElementById(this.out);
    if (idElem) {
      return idElem;
    }
    let descElem = !this.isChain && this.querySelector('chain-blam');
    if (descElem) {
      return descElem;
    }
    
    return this.closest('audio-blam');
  }

  toBoolean(name, value) {
    const isValue = Boolean(value);
		if (isValue)
			this.setAttribute(name, '');
		else
			this.removeAttribute(name);
  }

  beatsToHertz(beats) {
    return 1 / (this.beat * parseFloat(beats));
  }

  hertzToBeats(hertz) {
    return 1 / (this.beat * parseFloat(hertz));
  }

  convertValue(name, value, elem) {
    elem = elem || this;
    return elem.conversions?.[name] ? elem.conversions[name](value) : value;
  }

  newIndex(prevIndex, arr) {
    if (arr.length < 2) {
      return prevIndex;
    }
    let subset = arr.map((a, i) => i).filter(k => k !== prevIndex);
    return random.oneOf(subset);
  }

  cycle(prevIndex, arr) {
    return arr[prevIndex + 1] ? prevIndex + 1 : 0;
  }

  between(num, low, high) {
    return num >= low && num <= high;
  }

  watchProps(elems, func, filter = undefined, old = false) {
    const callback = (list, observer) => {
			func(list, observer);
		};

    const observer = new MutationObserver(callback);
    const settings = { 
      attributes: true,
      attributeFilter: filter,
      attributeOldValue: old
    }

    for (const elem of elems) {
      observer.observe(elem, settings);
    }
    return observer;
  }
}

export { Base }