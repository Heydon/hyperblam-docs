---
title: LFOs
---

You hear a sound when a wave of oscillating air particles meets your ear. A synthesizer’s oscillator produces such a sound wave electronically. 

So what’s an LFO (a Low Frequency Oscillator)? It sounds like an oscillator that’s very bassy and guttural. Maybe so bassy that it makes you soil yourself.

Fear not! Though they could be used to make super low, bowel disrupting sounds, LFOs typically don’t make a peep. Instead, their waveform is used to *modulate* the *parameters* of your sounds. 

I hope you like LFOs because, in **HYPERBLAM**, LFOs can even control other LFOs!

---

## Alternation

AC (alternating current) electricity produces a wave that cycles rapidly (*alternates*) between positive (`1`) and negative (`-1`) values. As a guitarist playing at high volume, you may even hear this electrical oscillation as “mains hum” and it can be quite annoying.

An LFO alternates at a lower, usually inaudible frequency. But it has the same basic anatomy: it cycles between positive and negative values. As with AC electricity, a standard LFO is *sinusoidal*. A *sine wave* alternates between `1` (its *peak*) and `-1` (its *trough*) smoothly and can be represented by a curved, wavy line.

![Diagram of a waveform identifying the peak, the amplitude, which is the distance between the peak and the vertical center line, the wavelength, which is the distance from the start of one peak to the end of one trough.]({{site.basedir}}/static/images/illustrations/LFOs1.svg)

## Modulation

What does this mean in practical terms? Well, your LFO is producing a value that changes between `1` and `-1` , passing through `0` in each direction, over time. This value can be connected to an `AudioParam` and used as a real-time *multiplier*. This alternating multiplication is called *modulation*.

Modulation has many purposes, but perhaps the most iconic are tremolo (gain modulation) and vibrato (pitch/frequency modulation). The terms “vibrato” and “tremolo” are often used interchangeably and it is a source of great consternation. Your guitar’s *whammy bar* is not a tremolo! *Whamming* at it loosens the strings, lowering their *pitch*.

## Tremolo

Let’s look at tremolo, since that’s probably the simplest application. In **HYPERBLAM**, you might have a signal chain that includes a `<gain-blam>` element. I can set up an LFO by simply inserting the element as a child and assigning the correct `target` parameter.

```html
<gain-blam gain="1">
  <lfo-blam 
    target="gain"
    beats="0.25"
    gain="1">
  </lfo-blam>		 
</gain-blam>
```

The `beats` prop’ sets the LFO’s frequency according to the local BPM (beats per minute). On a tremolo guitar pedal this might be labelled “rate”. In **HYPERBLAM**, `beats` is a special term used wherever the value has to be translated from seconds or, in the case of an [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode), hertz.

The important part is the LFO’s own `gain`. This sets how much the `<gain-blam>` element’s `gain` is modulated. Yes, it’s one `gain` controlling another, if that was confusing.

With an initial subject `gain` value of `1` and an LFO `gain` value of  `1` , the subject `gain` will modulate between `0` and `2`. That’s 1 - 1 and 1 + 1. 

`2` is a lot of gain, since it’s twice whatever the input gain is. Instead, you might want to set the initial value at `0.5` and the LFO’s modulation gain at `0.5` too. That gives us 0.5 - 0.5 (0) and 0.5 + 0.5 (1). We have achieved [*unity gain](*https://pedalplayers.com/what-is-unity-gain/*)*: the input gain matches the (maximum) output gain.

```html
<gain-blam gain="0.5">
  <lfo-blam 
    target="gain"
    beats="0.25"
    gain="0.5">
  </lfo-blam>		 
</gain-blam>
```

![Diagram showing how an LFO maps to gain. 1 is max gain, at the peak, 0 is min gain, and 0.5, the default, is at the vertical center.]({{site.basedir}}/static/images/illustrations/LFOs2.svg)

## Changing the waveform

What if we didn’t want our gain value to pass smoothly through zero? What if we wanted to alternate directly between the high and low values? This is what square waveforms are for. You can set the waveform to `square` using the `wave` prop’.

```html
<lfo-blam 
  target="gain"
  beats="0.25"
  gain="0.5"
  wave="square">
</lfo-blam>	
```

![A square waveform, with the vertical side of a square indicated as an instant switch between 0 and 1 in gain.]({{site.basedir}}/static/images/illustrations/LFOs3.svg)

Given the `x` axis represents the time domain, those vertical lines mean an instantaneous *switch* between low gains of `0` and `1`. This gives the tremolo effect quite a different, much *harsher* character.

## Low Frequency Oscillator Oscillators

No, that’s not a typo. **HYPERBLAM**, like the more complex and high-end hardware synths and samplers, lets you apply LFOs to other LFOs. In this case, we may want to gradually temper the first LFO’s `gain` over time. I’ll use the default sine `wave` for that nested LFO.

```html
<lfo-blam 
  target="gain"
  beats="0.25"
  gain="0.5"
  wave="square">
  <lfo-blam
    target="gain"
    gain="0.25"
    beats="3">
  </lfo-blam>
</lfo-blam>	
```

This will have two effects: 

1. Permutation of the relationship between the low and high gain half-cycles
2. Since the high gain half-cycle will dip, a fluctuation in the overall output gain

Gradual modulation (in this case, over three beats) can be used for all sorts of *spacey* and *woozy* effects. It’s also good for emulating the imperfections of mechanical audio equipment such as *tape*. 

## High Low Frequency Oscillators

Wait… what? In the Web Audio API, an `OscillatorNode` is just that. It can have very low frequencies or inaudibly high ones—all measured in hertz.

In practice, this means the kind of modulation usually associated with a *Low* Frequency Oscillator can just as easily occur at a (very) high frequency. What can we do with this? One of my favorite things to do is emulate a [Bitcrusher](https://en.wikipedia.org/wiki/Bitcrusher).

A real Bitcrusher achieves its characteristic lo-fi sound by being, well, actually *low fidelity*. It adopts either a lower *bit depth* or lower *sample rate* to *resample* the incoming sound. This true form of bitcrushing is possible using an [Audio Worklet](https://developer.chrome.com/blog/audio-worklet/). 

But we don’t need to use an Audio Worklet to get close to this sound. We can emulate lowering the sample rate by employing analog principles instead. That’s right: we can create **a digital emulation of an analog emulation of a digital effect**.

Set up to alternate between values of `0` and `1`, our square wave tremolo already behaves like it is sampling. That’s because digital sampling, no matter how high the sample rate (frequency), can only be done _discretely_—not _continuously_. Computers only deal in discrete numbers, you see.

<figure>

![A sine wave labeled continuous with individual lines representing discrete sampling points.]({{site.basedir}}/static/images/illustrations/LFOs4.svg)

  <figcaption>The series of “pins” representing discrete sampling points forms a <a href="https://en.wikipedia.org/wiki/Dirac_comb">dirac comb</a>.</figcaption>
</figure>

To emulate *downsampling*, we need to speed up the oscillator considerably. But we mustn’t speed it up so fast that it reaches parity with the rate at which the sound was originally sampled. This is typically 44100Hz. In `beats`, we might choose a value like `0.001`

```html
<lfo-blam 
  target="gain"
  beats="0.001"
  gain="0.5"
  wave="square">
</lfo-blam>	
```

What’s neat about this effect is that slightly changing that `beats` value can have an enormous impact on the character of the sound, since this is a form of [amplitude modulation](https://en.wikipedia.org/wiki/Frequency_modulation). That is, the amplitude of one wave is used to change the amplitude of another, affecting its overall shape. 

Truly _low_ frequency amplitude modulation acts as a tremolo effect: you hear the original sound—with its preserved character—simply dipping in amplitude. When the frequency of the carrier and modulator oscillators become similar, that’s when you hear a unified sound. But a new and surprising one.

It makes me think of the propellor on an airplane. At a slow rate of rotation, it still looks like a propellor. At much higher rates, you it appears as a circle: a completely different shape.

<figure>

![Two propellors. One spins slowly and you can still see its propellor shape. The other spins rapidly and forms a circular shape.]({{site.basedir}}/static/images/illustrations/LFO_prop.svg)

  <figcaption>The term <em>waveshaper</em> is usually preserved for a method of distortion. But we are literally shaping a wave here. Plus any augmentation of a wave’s shape is a <em>de facto</em> form of distortion.</figcaption>
</figure>


Applying a secondary LFO, as we did before, but to control the principle LFO’s `frequency` lets us _sweep_ through all sorts of weird, robotic, metallic, fuzzy timbres.

```html
<lfo-blam 
  target="gain"
  beats="0.001"
  gain="0.5"
  wave="square">
  <lfo-blam
    target="beats"
    beats="3"
    gain="0.01"> 
  </lfo-blam>	
</lfo-blam>
```