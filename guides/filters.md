---
title: Filters
order: 5
---

In simple terms, filters remove or add frequency information. Given that frequency determines *what you hear*, filters could scarcely be more important in sound design. They can give your mix depth and *separation*, power *wah-wah* effects, and sculpt synthesizer timbre. 

**HYPERBLAM** supports all of these shenanigans. It even offers a *phaser* effect, using a filter to make your sound slide back and forth, altering its phase relationship *with itself*.

---

## Warmth

Guitar playing traditionalists attribute an elusive, artisanal “warmth” to their ancient and coveted analog equipment. They believe it’s a quality simply not attainable using digital amp modeling.

But the source of this warmth is straightforward to both deduce and digitally recreate. A guitar amplifier’s frequency response—the range of frequencies it is *able* to reproduce—just doesn’t go that high. They sound *warm* because none of the higher, sometimes harsher frequencies, above about 7KHz, get through.

![A chart plotting amplitude (y) against frequency (x). An amplifier is trapped behind a drop in frequency at 7K. Its output can’t break through this wall.]({{site.basedir}}/static/images/illustrations/filters1.svg)

A digital system typically doesn’t know if you’re trying to create a guitar sound or something suiting higher, or lower, frequency data. So it gives you the widest possible range to play with.

That’s where filters can help. When I play my baritone guitar live (directly into a PA system with a much wider frequency response than a guitar amp), people sometimes remark on the sound’s *realism;* its similarity to a real amp. This can be attributed to a single *lowpass* filter in my digital signal chain. I just filter out all the frequencies above that 7KHz mark. The rest of the frequencies are *given a pass*.

Lowpass is the most common and useful *single band* filter, so it’s the default in both the Web Audio API and **HYPERBLAM.** The *cutoff frequency* (the point at which passed frequencies drop off) is set in hertz, using the `freq` prop’:

```html
<filter-blam
  freq="7000"
>
</filter-blam>
```

The papery, creaky thump of a kick drum sample can be transformed into a soft, dull throb more suitable for EDM. In the [“Wah, I’m Sad”]({{site.basedir}}/examples/wah-im-sad/) example, I use `150Hz`:

```html
<filter-blam
  freq="150"
>
</filter-blam>
```

## Wah

The iconic *wah-wah* effect prized by guitarists like Jimi Hendrix uses a *bandpass* filter.  This extreme sort of filtering cuts off both low *and* high frequencies, leaving a single *band*. The position of this band is *sweeped* between high and low frequencies by tilting the pedal with your foot. 

![A foot tilted backwards on a pedal with a diagram of a frequency band appearing on the left. Underneath a foot is tilted forward on a pedal and the band has shifted to the right.]({{site.basedir}}/static/images/illustrations/filters3.svg)

It sounds like a baby going “wah” because it’s a kind of _spectral glide_, shifting the perceived vowel sound.

You can emulate this effect in **HYPERBLAM** by applying an LFO to the bandpass filter. There’s a whole [guide on LFOs]({{site.basedir}}/guides/LFOs/). In this case, an LFO emulates Jimi Hendrix’s foot, rocking back and forth to change the frequency band’s position over time. See [“Wah, I’m Sad”]({{site.basedir}}/examples/wah-im-sad/) for an implementation.

```html
<filter-blam type="bandpass" freq="850" q="3">
  <lfo-blam id="pedal" prop="freq" gain="500" beats="0.75"></lfo-blam>
</filter-blam>
```

Note the `q` prop’. For a bandpass filter, this determines the width of the band. The _higher_ the value, the _narrower_ the band. A classic wah pedal has a `q` of about `3`. The center frequency (`freq`) is typically somewhere between `0` and `2KHz`.

## Phaser

So what’s that *phaser* thing I mentioned before? 

The phase of a sound wave is its position in time. Since waves are continuous, this makes very little difference to your experience of the sound in isolation.

But imagine we are recording the same sound with two microphones set at slightly difference distances from the source.

![A guitar amplifier with two microphones positioned with one closer to the amplifier than the other.]({{site.basedir}}/static/images/illustrations/filters2.svg)

In this scenario, it takes a little longer for the sound to reach the more distant mic’. This gives the two recordings relatively different phases. 

Which is problematic. As you may have already learned from my guide on LFOs, waves *cycle* between positive and negative values. Where two similar and adjacent waves are *out of phase* they cancel parts of each other out. If they are perfectly out of phase—where every `-1` of one wave aligns with every `1` of the other—we get *phase cancellation*. As in: you don’t hear s**t.

![Two copies of the same waveform become exactly out of alignment. One’s peak aligns with the other’s trough.]({{site.basedir}}/static/images/illustrations/filters4.svg)

A phaser effect messes with phase on purpose. Using an *allpass* filter (a filter that does *not* alter frequency information), it creates a copy of the original signal. The phase relationship between the copy and the original can be changed over time. 

As the two identical sounds move in and out of phase, frequency information is lost and regained, creating the characteristic swooshing sound of a phaser effect. In the already chaotic [“AutoMayhem”]({{site.basedir}}/examples/06-automayhem/) example, you can switch on the `<phaser-blam>` for added texture.

```html
<phaser-blam beats="2"></phaser-blam>
```

Phasing is great for adding a sense of motion to your music. The slower the rate of phase, the longer the transformation over time.