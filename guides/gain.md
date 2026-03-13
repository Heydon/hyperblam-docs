---
title: What Is Gain?
order: 1
---

We need to talk about *gain*. Gain is not just one of the most important, and widely misunderstood, concepts in amplification. It’s also, perhaps, the most foundational and useful type of *node* belonging to the Web Audio API.

---

## Gain is relative

This is the first thing to get your head around. In either an analog or a digital context, gain is *how much more you add*. That value is necessarily relative to *how much you’re getting in the first place*. Adding more signal = amplification.

You can *add more* in multiple different places along your signal chain. These places are sometimes called *gain stages*. Each stage makes a relative adjustment, in series. 

![Three gain nodes connected in series. The first has a value of 0.5, the second a value of 0.75, and the third a value of 1.5]({{site.basedir}}/static/images/illustrations/gain1.svg)

The gain value of a [`gainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) is set as a number. A gain of `0.75`, followed by a gain of `0.5`, followed by a gain of `1.5`, would give you an outgoing value of `0.75` &times; `0.5` &times; `1.5`&hellip; or  `0.5625`. 

```html
<chain-blam>
  <gain-blam gain="0.75"></gain-blam>
  <gain-blam gain="0.5"></gain-blam>
  <gain-blam gain="1.5"></gain-blam>
</chain-blam>
```

For a more practical application, consider the feedback loop that creates an echo effect. Inside this loop, a single gain stage is passed through multiple times. 

![A delay node is attached to a gain node in a feedback loop. This makes the delay’s output become lower each time]({{site.basedir}}/static/images/illustrations/gain2.svg)

A lowish gain value, like `0.5` gives noticeably diminishing returns. This approximates a true echo, which loses energy as it is partially absorbed by the surfaces it bounces off.

```html
<echo-blam 
  feeback="0.5" 
  cutoff="2000"
>
</echo-blam>
```

Giving the echo effect’s gain (often labeled “feedback” in a commercial unit) a value approaching `1` causes it to go into a state called *self-oscillation*. In this state, echos compound and get louder, ultimately leading to *distortion*.

## You get distortion when you hit a ceiling

The next part is really important. It’s important because it accounts for the entire history, and enduring popularity, of rock ‘n’ roll over the best part of a century. Which is a pretty big deal.

Sometimes you ask for *more* and there’s *no more* to give. That sounds bad, right? And, yeah, theoretically it is. But it’s also the simplest way to create distortion. Sometimes we like distortion. Oftentimes, we love it. We apply *gain* to create *distortion* so often, the two terms are often used interchangeably.

When you tell an amplifier (gain stage) to give you `1.5`, but all it can manage is `1.25`, then `1.25` is its *ceiling*. There’s nowhere for the remaining `0.25` to go, so it gets decapitated (or “clipped”). The more powerful the amplifier, the less likely decapitation will occur. Hence, powerful amplifiers are said to have a lot of *headroom*.

![Comparing one sine-shaped wave with another that has each trough and peak cut off]({{site.basedir}}/static/images/illustrations/gain3.svg)

Sound decapitation isn’t fatal, though. If it were, rock ‘n’ roll would fall silent. Instead, lopping the top off just changes the *shape* of the waveform. How abruptly the head is lopped off (how hard the *clipping*) helps determine the perceived character of the distorted sound. 

A high input gain combined with extremely hard clipping can produce something akin to a square shaped wave. This is why some fuzz guitar effects can make your guitar sound like a synthesizer: synthesizers often produce sounds based on basic square waveforms.

Nobody likes _unintended_ distortion, but nobody in revolutionary France was getting decapitated by accident. Distortion is transformation; the creation of a new, more complex and textured sound from the old. To conservatives, transformation is transgression. The bold, distorted sound of rock ‘n’ roll is, therefore, *“the devil’s music”*.

![A woman in old fashioned, Victorian dress holds a placard reading “don’t push rock and roll junk”]({{site.basedir}}/static/images/illustrations/gain_sign.svg)

## Distortion sounds loud

As I’ve already established, distortion only happens when amplitude hits a ceiling. It’s literally the effect of sound *not* getting louder. So why does distortion sound loud? 

Again, it’s a question of relativity. The more gain you apply, the more of the sound hits the ceiling. First it’s just the louder parts of the sound, then it’s the quieter parts too. The ceiling doesn’t move, but more of it is covered. It’s _more maximum at once_, which is perceivably louder.

![As a capped wave gets higher in amplitude the width of each ceiling gets wider]({{site.basedir}}/static/images/illustrations/gain4.svg)

Both distortion and *compression* add perceived loudness. A compressor just uses a more complex algorithm, flattening the [dynamic range](https://en.wikipedia.org/wiki/Dynamic_range) without introducing clipping. 

The [“loudness wars”](https://en.wikipedia.org/wiki/Loudness_war) are where producers competitively add compression, to make their tracks sound louder than their peers’. Unfortunately, this results in popular music sounding, overall, more flat and lifeless. Where the quieter sounds aren’t allowed to be quiet, the loud ones don’t come off as loud. Remember: it’s all relative.

## Gain isn’t just for gain

When working with the Web Audio API, gain nodes aren’t just useful for affecting gain. A gain node with a gain value of 1 transparently reproduces any signal sent to it. As such, it can be used as a *junction box*. 

Each of the effects available in **HYPERBLAM** are based on a primitive `Box` class that implements `wet` and `dry` properties. The *mix* of the effect is the ratio between the wet (affected) and dry (unaffected) versions of the signal.

In the following example, the first of the echos is already only 25% the amplitude of the initial (dry) sound it follows. By default, `dry` is `1`, for `<echo-blam>`.

```html
<echo-blam 
  feeback="0.5" 
  cutoff="2000"
  wet="0.25"
>
</echo-blam>
```

This is possible by sending the incoming signal to a transparent gain node, then diverging the signal into parallel wet and dry paths. 

Each of these paths has its own gain node, controlled by the `wet` and `dry` props respectively. Finally, these are each connected to an “out” gain node—another junction.

![A single line leads to a node labeled in. Two lines emerge from this node, forming parallel lines—one containing a dry gain node and the other an effect node and a wet gain node. Finally, these two lines converge on a node labeled out.]({{site.basedir}}/static/images/illustrations/gain5.svg)

For the purpose of chaining effects, this is really convenient. Each effect only needs a single entry and single exit point. The mix is handled internally (inside the so-called _box_).

Thanks to class inheritance, the `dry` and `wet` getters and setters (and their registry in `observedAttributes`) only need to be set up once, in the primitive `Box.js` element on which each effect element is based.