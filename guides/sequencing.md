---
title: Sequencing
order: 4
---

If you’re familiar with JavaScript (my sympathies), then you’re probably familiar with events and event listeners. Fundamentally, events let a JavaScript application *talk to itself*.

Musicians are event emitters and listeners too. A drummer hits their sticks together to count their band in. A bassist performs an elaborate arpeggio to herald a group transition. An orchestral conductor is essentially a high frequency JavaScript event emitter in humanoid form.

**HYPERBLAM** enables generative composition by handling *events* according to *probabilities.* But you don’t actually have to write the JavaScript for those events; the HTML elements take care of that for you.

---

## Events-based sequencing

The `<sequencer-blam>` element has quite a simple task. It acts as a kind of silent metronome, counting out every step (a quarter-beat, by default) in an infinite sequence. When it knows the exact time the next step should land, it emits a `blam` event communicating that timing. 

Any **HYPERBLAM** elements listening for that `blam` event can synchronize itself to the ongoing sequence. 

![Timeline showing how the sequencer element sets the future time, transmits an event with time data, then is consumed by a subscriber element, before the time finally coming along.]({{site.basedir}}/static/images/illustrations/sequencing1.svg)

This opens up some possibilities. You could take a steam of live data and use it to trigger `<notes-blam>` sounds directly. A live, but perfectly *quantized*, musical performance of the stock exchange? Or weather patterns? Github commits?

More commonly, you would subscribe to a `<sequencer-blam>`’s events using a `<track-blam>` element. That’s where **HYPERBLAM** starts to feel like a drum machine. And it’s one with some pretty cool features, similar to the high-end hardware machines from Elektron or Roland.

## Polymetrics

Each `<track-blam>` element presides over one or more `<bar-blam>` elements. The `s` prop (for “sequence”, “steps”, “sounds”, or whatever works best for you) sets out the pattern for that bar. For an instrument like the percussion-optimized `<pad-blam>`, positive integers represent different samples belonging to a `<bank-blam>`. A `0` represents no sound; a pause.

```html
<sequencer-blam>
  <pads-blam>
    <track-blam>
      <bar-blam s="1 0 0 0 2 0 1 3"></bar-blam>
    </track-blam>
    <bank-blam>
      <sample-blam src="sounds/1.mp3"></sample-blam>
      <sample-blam src="sounds/2.mp3"></sample-blam>
      <sample-blam src="sounds/3.mp3"></sample-blam>
    </bank-blam>
  </pads-blam>
</sequencer-blam>
```

Good start. But what if I introduce another `<pads-blam>` with another `<track-blam>` with a bar using a pattern of a different length?

```html
<sequencer-blam bpm="90">
  ...
  <track-blam>
    <bar-blam s="1 0 3"></bar-blam>
  </track-blam>
  ...
  <track-blam>
    <bar-blam s="2 0 2 0"></bar-blam>
  </track-blam>
  ...
</sequencer-blam>
```

The tempo of these two tracks is shared (taken from a common `<sequencer-blam>`’s `bpm`) but their *time signatures* differ. The result is *polymetric:* beats stay obstinately in sync but the bars they belong to diverge. 

Working with polymeters is fun because the relationship between the individual tracks changes over time. Since it’s difficult (at least for me!) to anticipate what that shifting relationship will sound like, the music stays fresh for longer. To get the length of the compound pattern, you multiple the lengths of each constituent bar. In this case, it’s `3 × 4`, or `12`.

![A two track pattern illustrated as rows of blocks. Four blocks of 3 beats length each take up the same space as three blocks at 4 beats length each.]({{site.basedir}}/static/images/illustrations/sequencing2.svg)

What if each track had two bars with different pattern lengths?

```html
<track-blam>
  <bar-blam s="1 0 3"></bar-blam>
  <bar-blam s="1 0 3 2 0"></bar-blam>
</track-blam>
...
<track-blam>
  <bar-blam s="2 0 2 0"></bar-blam>
  <bar-blam s="2 0 2 0 1 0 3"></bar-blam>
</track-blam>
```

Now the compound pattern is `(3 + 5) × (4 + 7)`, or `88`. Or, instead, what about four separate tracks with single bars of different lengths?

```html
<track-blam>
  <bar-blam s="1 0 3"></bar-blam>
</track-blam>
...
<track-blam>
  <bar-blam s="1 0 3 2 0"></bar-blam>
</track-blam>
...
<track-blam>
  <bar-blam s="2 0 2 0"></bar-blam>
</track-blam>
...
<track-blam>
  <bar-blam s="2 0 2 0 1 0 3"></bar-blam>
</track-blam>
```

Now it’s `3 × 5 × 4 × 7`, or `420`. So you can see how very little code can create long, deterministic patterns. Switching to an infinitely long, nondeterministic pattern is just a matter of adding a `chance` property to one or more of the tracks.

```html
<track-blam chance="0.75">
  <bar-blam s="2 0 2 0 1 0 3"></bar-blam>
</track-blam>
```

See [**Probabilism**](#probabilism) for more.

## Overrides

We have something to address. In most drumbeats, the kick and snare should occupy their own space. A drummer very rarely plays those two drums at the same time. But, as polymetric track relationships shift over time, collisions are inevitable. 

![A snare pattern with the snare sound on the third of four beats, with a kick pattern underneath, where the kick sound is the first of three beats. The third kick sound collides with the second snare sound.]({{site.basedir}}/static/images/illustrations/sequencing3.svg)

This is where overrides come in. Using the `override` prop, I can set which tracks take precedence, thereby avoiding collisions. 

```html
<track-blam id="snare" override="kick">
  <bar-blam s="0 0 1 0"></bar-blam>
</track-blam>
...
<track-blam id="kick">
  <bar-blam s="1 0 0"></bar-blam>
</track-blam>
```

Using more complex patterns, this can go a surprisingly long way towards making a simple polymetric arrangement sound like an improvising drummer choosing, in the moment, where to place their kick and snare. But overrides aren’t just for drums. You can use them to carve out space for any sounds.

## Probabilism

Multiple **HYPERBLAM** elements are based on a primitive element called `Event.js` which takes care of generic event handling. All these elements inherit a `chance` prop that determines how likely the element will respond to a subscribed event. Playing, detuning, filtering, panning, muting, pretty much anything can be *left to chance*.

The `<track-blam>` element calculates whether a sound should play, at any given time, based on interactions between probabilities, overrides, and other settings. Once you put these conditions in place, you can just sit back and listen to the composition write itself in real time.

![Three tracks with their own probabilities, represented as dice, with each pointing to an output with a dashed line.]({{site.basedir}}/static/images/illustrations/sequencing4.svg)

Using generative AI, you can ask for a “sultry country song” and you’ll receive 637 low quality mp3s having a plagiaristic lemon party in your long-suffering ear holes. True generative music making isn’t about resurrecting the dead. With a handful of kilobytes, you can set about making something genuinely new.