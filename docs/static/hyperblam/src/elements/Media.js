import { Base } from '../primitives/Base.js';

class Media extends Base {
  onSource() {
    this.fire('blamsource', {}, this, true);
  }

  onblamready() {
    this.mediaElem = this.element ? document.querySelector(this.element) : this.querySelector('audio, video');
    this.mediaElem.crossOrigin = 'anonymous';

    if (this.mediaElem.readyState > 3) {
      this.onSource();
    } else {
      this.mediaElem.addEventListener('canplaythrough', this.onSource.bind(this));
    }

    this.mediaElem.addEventListener('play', () => {
      this.context().resume();
      this.fire('blam', {}, this);
      this.fire('blamplay', {}, this);
    }); 

    this.mediaElem.addEventListener('ended', () => {
      this.fire('blamstop', {}, this);
    }); 

    this.source = this.context().createMediaElementSource(this.mediaElem);
    this.sourceSrc = this.mediaElem.src;
    this.mediaElem.setAttribute('src', this.sourceSrc);

    this.outElem = this.getOut();
    this.source.connect(this.outElem.inNode);
  }

  get out() {
		return this.getAttribute('out');
	}

	set out(value) {
		this.setAttribute('out', value);
  }

  get element() {
		return this.getAttribute('element');
	}

	set element(value) {
		this.setAttribute('element', value);
  }
}

export { Media }