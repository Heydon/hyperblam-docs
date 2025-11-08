class Base extends HTMLElement {
  constructor() {
    super();
    window.addEventListener('blamready', this, { once: true });

    this.noteNums = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    this.noteMods = { 'b': -1, '#': 1 };

    this.random = {
      oneOf(array) {
        array = array || [0];
        return array[Math.floor(Math.random() * array.length)];
      },
      chance(fraction) {
        return Math.random() <= fraction;
      },
      floatBetween(min, max) {
        min = min > max ? max : min;
        max = max < min ? min : max;
        return (Math.random() * (max - min) + min);
      },
      integerBetween(min, max) {
        min = min > max ? max : min;
        max = max < min ? min : max;
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    }
  }

  handleEvent(event) {
    this[`on${event.type}`] && this[`on${event.type}`](event);
  }

  fire(name, data, target = window, bubbles = true) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: bubbles
    });

    target.dispatchEvent(event);
  }

  between(num, low, high) {
    return num >= low && num <= high;
  }

  newItem(discard, keep) {
    let subset = keep.filter(keeper => keeper !== discard);
    return subset.length ? this.random.oneOf(subset) : discard;
  }

  // ↓ Get next item in array (wrap around if needed)
  cycle(prevItem, steps) {
    let prevIndex = prevItem ? steps.indexOf(prevItem) : 0;
    let nextIndex = steps[prevIndex + 1] ? prevIndex + 1 : 0;
    return steps[nextIndex];
  }

  stringOrNum(string) {
    let notNum = !Number(string) && string !== '0';
    return notNum ? string : parseFloat(string);
  }

  parse(value, fallback) {
    // ↓ Catch Boolean attributes first
    if (!value) {
      return fallback || null;
    }
    if (value.includes('|')) {
      let values = value.split('|').map(v => this.stringOrNum(v));
      let result = this.newItem(this.prevValue, values);
      this.prevValue = result;
      return result;
    }
    if (value.includes('~')) {
      let values = value.split('~').map(v => parseFloat(v));
      return this.random.floatBetween(values[0], values[1]);
    }
    return this.stringOrNum(value);
  }

  toBoolean(name, value) {
    const isValue = Boolean(value);
		if (isValue)
			this.setAttribute(name, '');
		else
			this.removeAttribute(name);
  }

  getTime() {
    if (this.time) {
      return this.time;
    }
    let timeElem = this.closest('[data-player-blam], sequencer-blam');
    return timeElem?.time || this.context().currentTime;
  }

  exposeParams(params) {
    this.params = this.params || {};
    this.params = {...this.params, ...params};
    this.fire(
      'params', 
      this.params, 
      this, 
      false
    )
  }

  context() {
    let audioElem = this.closest('audio-blam');
    return audioElem.context;
  }

  get beat() {
    // ↓ bpm can be set on sequencer or audio elements
    const bpm = this.closest('sequencer-blam, audio-blam').bpm;
		return 60 / bpm;
	}

  get quarterBeat() {
		return 0.25 * this.beat;
	}

  toHertz(beats) {
    return beats ? 1 / (this.beat * parseFloat(beats)) : 1 / this.beat;
  }

  // ↓ Find the next element in the signal chain
  getOut() {
    if (this.isChain && this.parentNode.isChain) {
      return null;
    }

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

  nameToNum(name) {
    if (!!Number(name)) {
      return name;
    }

    // ↓ Get letter
    let letter = name[0];
    let pc = this.noteNums[letter.toUpperCase()];
  
    // ↓ Modify
    let mod = name[1];
    let trans = this.noteMods[mod] || 0;
    pc += trans;
  
    let num = Array.from(name).pop();
    let octave;
    if (isNaN(num)) {
      octave = 4;
    } else {
      octave = parseInt(num);
    }  
  
    return pc + (12 * (octave + 1));
  }

  watchProp(elems, func, filter) {
    const callback = (list, observer) => {
			func(list, observer);
		};

    const observer = new MutationObserver(callback);
    const settings = { 
      attributes: true,
      attributeFilter: filter || null
    }

    for (const elem of elems) {
      observer.observe(elem, settings);
    }
    return observer;
  }


  static context = new AudioContext();
}

export { Base }