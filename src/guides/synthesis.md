---
title: Synthesis
order: 7
---

One’s first foray into web audio typically involves creating, connecting, and starting an oscillator. This will make your browser go beep, indefinitely, as if self-censoring a perpetual…

![fuck!]({{site.basedircdn}}/static/images/illustrations/synthesis1.svg)

To actually hear someone say “hello world” is a lot more involved—though it’s made trivially easy with **HYPERBLAM**’s [sampling capability](/elements#sampling).

Synthesis and sampling are opposing philosophies. The former, hewing sound from basic waveforms, is modernist. The latter, taking and recontextualizing preprocessed sound from disparate sources, is postmodernist. 

Both are legitimate art forms. But there’s something particularly empowering about creating timbre, texture, and motion by combining and augmenting elemental shapes. 

**HYPERBLAM**’s approach to synthesis is highly flexible, enabling the emulation of many familiar sounds. But that’s not the fun part. The fun part is making the kind of weird and warped sounds folks have yet to hear, and may later regret subjecting themselves to.

## Oscillators and filters

In **HYPERBLAM** (and the Web Audio API it builds on), oscillators are plentiful and computationally cheap. In the LFO guide, you’ll learn how a single audio parameter can be controlled by multiple LFOs (Low Frequency Oscillators) and these LFO’s params can even take LFOs of their own.

By way of contrast, hardware synthesizers, like the Moog Model D, have a set number of oscillators. The original Model D didn’t even have a dedicated LFO. You had to repurpose one of its 3 audible (higher frequency, sound making) oscillators for modulation purposes.

Despite this, the Model D (and its various emulations) have an enduring popularity. Its characterful sound comes from two kinds of synthesis:

1. **Additive:** combining the three oscillators (and the many, complex waveforms you can choose for each).
2. **Subtractive:** a highly regarded (some say *iconic*) implementation of a lowpass filter for carving frequencies *out* of the combined sound resulting from (1).

![a set of three oscillators labelled additive, being routed through a single filter control labelled subtractive]({{site.basedircdn}}/static/images/illustrations/synthesis2.svg)

In **HYPERBLAM**, the `<synth-blam>` element takes any number of `<carrier-blam>` elements as oscillators. The term “carrier” is taken from FM synthesis terminology and means an oscillator (or “operator”) that literally *carries* sound to your ear.

Combining just one sawtooth `<carrier-blam>` with an auxiliary `<envelope-blam>` to control a filter, it’s possible to emulate the iconic and much sampled lead sound heard on [The JB’s Blow Your Head](https://www.discogs.com/release/229241-Fred-Wesley-The-JBs-Blow-Your-Head?srsltid=AYCX9vIUyRGeRD7AOZQFT8OwPzXpayqLg3znn4tFFQU7CoSWopBmN3Ct) (or [DJ Zinc’s Super Sharp Shooter](https://www.whosampled.com/DJ-Zinc/Super-Sharp-Shooter/) for the sample, and if you’re into cheap amphetamines).

```html
<synth-blam gain="4" notes="C1 D#1 F1 C1 C2 D#2 F2 C3">
  <carrier-blam curve="0 0, 1 0.2" release="0.05" type="sawtooth">
    <chain-blam>
      <filter-blam type="bandpass" freq="1000" q="4">
        <envelope-blam prop="freq" curve="100 0, 4000 0.666, 500 1"></envelope-blam>
        <lfo-blam prop="freq" gain="100"></lfo-blam>
        <lfo-blam prop="freq" gain="100" beats="2.3"></lfo-blam>
      </filter-blam>
    </chain-blam>
    <lfo-blam prop="detune" gain="25" beats="0.7"></lfo-blam>
    <lfo-blam prop="detune" gain="25" beats="1.3"></lfo-blam>
  </carrier-blam>
</synth-blam>
```

The Model D’s filter is technically a kind of lowpass, but I use a [bandpass](https://en.wikipedia.org/wiki/Band-pass_filter) in the [“In A Bad Moog”]({{site.basedir}}/examples/03-in-a-bad-moog) example. It got me closer to the extreme raspy sound needed. Multiple LFOs are employed to emulate a player twiddling with the filter cutoff and pitch wheel controls.

## Multiple oscillators

The `<synth-blam>` element itself doesn’t make sound, it just channels it.

```html
<synth-blam notes="C4 D#4 G4">
  <carrier-blam curve="0 0, 0.01 1" release="0.1"></carrier-blam>
  <carrier-blam curve="0 0, 0.01 1" release="0.1" offset="11.9"></carrier-blam>
  <carrier-blam curve="0 0, 0.01 1" release="0.1" offset="24"></carrier-blam>
</synth-blam>
```

When the above synth’s `play()` function is triggered, each `<carrier-blam>` plays out, using the sharp attack defined by each matching envelope `curve`. The second two carriers, in this case, take frequencies that are `offset` from the fundamental (base note) produced by the first carrier. This is a form of additive synthesis; we are adding harmonics. 

This code is a simplified version of the [“Not A Farfisa But A Nearfisa”]({{site.basedir}}/examples/02-not-a-farfia-but-a-nearfisa) example. Note that the second carrier doesn’t *quite* set an octave (12 semitone) `offset`. This reproduces the authentic sound of a worn out, *detuned* Farfisa organ suffering from one oscillator being slightly under voltage.

```html
<synth-blam notes="C4 D#4 G4">
  <carrier-blam curve="0 0, 0.01 1" release="0.1"></carrier-blam>
  <carrier-blam curve="0 0, 0.01 1" release="0.1" offset="11.9"></carrier-blam>
  <carrier-blam curve="0 0, 0.01 1" release="0.1" offset="24"></carrier-blam>
  <lfo-blam prop="detune" gain="30" beats="0.25" type="triangle"></lfo-blam>
</synth-blam>
```

The Farfisa’s original vibrato was based on a triangle wave, hence `type` in the above code. An LFO (Low Frequency Oscillator) placed as a child of `<synth-blam>` modulates the `detune` of each constituent `<carrier-blam>` in unison, effecting the combined output. Under the hood, this uses a [`constantSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/ConstantSourceNode) to create the one-to-many relationship.

The primitive drums are created using the same synthesizer elements. Note the `feedback` property. This feeds the `<carrier-blam>`’s oscillator back into itself. With a high value, it transforms the signal into pseudo-noise.

![An oscillator taking a sine input signal, routing it through a slight delay and a gain node, back into itself.]({{site.basedircdn}}/static/images/illustrations/synthesis3.svg)

Noise is often used to emulate percussive sounds like snare drums. This is just an slightly unusual way of generating it.

## Frequency modulation

Additive synthesis puts frequencies in _parallel_. Frequency modulation (FM) puts frequencies in _series_. FM synthesizers do a combination of both, according to various algorithms.

Frequency modulation works by connecting one oscillator to another oscillator’s frequency. The output combines the two frequencies into a more complex waveform. It takes a lot fewer oscillators, in total, to get cool and weird sounds compared with stacking them additively.

![A low frequency wave combined with a higher frequency wave to create a more complex wave]({{site.basedircdn}}/static/images/illustrations/synthesis4.svg)

In the simple FM-based [“Feelin’ Hype Hype Hype”]({{site.basedir}}/examples/04-feelin-hype-hype-hype) example, there’s are two carrier oscillators:

1. One to carry the note, with a relatively long decay
2. One with a lower frequency and a very short decay, to simulate the *knocking* sound at the start of the instrument being struck

But what gives the sound real character is the `<modulator-blam>` that augments carrier (1) for a short time at the start of each note. This modulator has a `ratio` of `3`, which applies the metallic character of a steel drum.

![A carrier envelope with a shorter modulator envelope inside it.]({{site.basedircdn}}/static/images/illustrations/synthesis5.svg)

The remaining ingredient is a `detune`-attached auxiliary envelope (`<envelope-blam>`) that slightly “bows” the pitch with each strike.

### Simulating velocity

In the humanization guide, I talk about sampling the same percussive instrument, multiple times, to *humanize* the beat. This works, partly, because each time a drummer hits a drum—and is sampled doing so—they do so with a different level of force or “velocity”.

This doesn’t just change the *volume* of the sound but its character too. A drum hit harder may sound *sharper*, because a harder strike releases more high frequency harmonics at the start of the sound. 

```html
<modulator-blam curve="0 0, 1 0.03, 0 1.25" ratio="3" gain="750">
  <blam-blam prop="gain" value="100~2000"></blam-blam>
</modulator-blam>
```

The [“Feelin’ Hype Hype Hype”]({{site.basedir}}/examples/04-feelin-hype-hype-hype) example emulates this by fluctuating the gain of the `<modulator-blam>` element. In FM synthesis, modulator gain is sometimes, rather verbosely, referred to as the *modulation index*. It’s how much the modulator is allowed to, well, modulate the carrier signal.