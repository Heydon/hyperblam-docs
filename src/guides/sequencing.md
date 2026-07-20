---
title: Sequencing
order: 4
---

If you’re familiar with JavaScript (my sympathies), then you’re probably familiar with events and event listeners. Fundamentally, events let a JavaScript application *talk to itself*.

Musicians are event emitters and listeners too. A drummer hits their sticks together to count their band in. A bassist performs an elaborate arpeggio to herald a group transition. An orchestral conductor is essentially a high frequency JavaScript event emitter in humanoid form.


**HYPERBLAM** enables generative composition by handling *events* according to *probabilities.* But you don’t actually have to write the JavaScript for those events; the HTML elements take care of that for you. In **HYPERBLAM**, HTML generates sound that writes HTML that generates sound.

![Spiderman pointing at himself. One spider man uses HTML to generate sound then the other spider man uses sound to generate HTML]({{site.basedircdn}}/static/images/illustrations/sequencing_spiderman.svg)

---

## Events-based sequencing

The `<sequencer-blam>` element has quite a simple task. It acts as a kind of silent metronome, counting out every step (a quarter-beat, by default) in an infinite sequence. When it knows the exact time the next step should land, it emits a `blam` event communicating that timing. 

Any **HYPERBLAM** elements listening for that `blam` event can synchronize itself to the ongoing sequence. 

![Timeline showing how the sequencer element sets the future time, transmits an event with time data, then is consumed by a subscriber element, before the time finally coming along.]({{site.basedircdn}}/static/images/illustrations/sequencing1.svg)

This opens up some possibilities. You could take a steam of live data and use it to trigger `<notes-blam>` sounds directly. A live, but perfectly *quantized*, musical performance of the stock exchange? Or weather patterns? Github commits?

More commonly, you would subscribe to a `<sequencer-blam>`’s events using a `<track-blam>` element. That’s where **HYPERBLAM** starts to feel like a drum machine. And it’s one with some pretty cool features, similar to the high-end hardware machines from **Elektron** or **Roland**.

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

Working with polymeters is fun because the relationship between the individual tracks changes over time. Since it’s difficult (at least for me!) to anticipate what that shifting relationship will sound like, the music stays fresh for longer. To get the length of the compound pattern, you multiply the lengths of each constituent bar. In this case, it’s `3 × 4`, or `12`.

![A two track pattern illustrated as rows of blocks. Four blocks of 3 beats length each take up the same space as three blocks at 4 beats length each.]({{site.basedircdn}}/static/images/illustrations/sequencing2.svg)

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

The [“Snare Makes The Groove”]({{site.basedir}}/examples/03-snare-makes-the-groove) example uses polymetrics to help create a constantly evolving beat. This is assisted with [**probabilism**](#probabilism).

## Overrides

In that [“Snare Makes The Groove”]({{site.basedir}}/examples/03-snare-makes-the-groove) example you’ll see a curious `override` prop being used with the `<track-blam>` elements. This is really important.

In most drumbeats, the kick and snare should occupy their own space. A drummer very rarely plays those two drums at the same time. But, as polymetric track relationships shift over time, collisions are inevitable. 

![A snare pattern with the snare sound on the third of four beats, with a kick pattern underneath, where the kick sound is the first of three beats. The third kick sound collides with the second snare sound.]({{site.basedircdn}}/static/images/illustrations/sequencing3.svg)

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

Using more complex patterns, this can go a surprisingly long way towards making a simple polymetric arrangement sound like an improvising drummer choosing, in the moment, where to place their kick and snare. In the ensuing [“getting ghosted”]({{site.basedir}}/examples/04-getting-ghosted/) example, the snare track overrides tracks with `id`s `kickTrack` and `softSnareTrack`. Simultaneously, `kickTrack` overrides `softSnareTrack`, to ensure the underpinning kick drum doesn’t become too sparse. 

Overrides aren’t just for drums. You can use them to carve out space for any sounds.

## Probabilism

Multiple **HYPERBLAM** elements are based on a primitive element called `Handle.js` which takes care of generic event handling. All these elements inherit a `chance` prop that determines how likely the element will respond to a subscribed event. Playing, detuning, filtering, panning, muting, pretty much anything can be *left to chance*.

The `<track-blam>` element calculates whether a sound should play, at any given time, based on interactions between probabilities, overrides, and other settings. Once you put these conditions in place, you can just sit back and listen to the composition write itself in real time. By sending and responding to events, internally, the composition makes decisions for itself.

![Three tracks with their own probabilities, represented as dice, with each pointing to an output with a dashed line.]({{site.basedircdn}}/static/images/illustrations/sequencing4.svg)

## Blam Blam!

The eponymous `<blam-blam>` element does a lot of heavy lifting. Kind of a mascot for **HYPERBLAM**, this element uses incoming events to change props, write attributes, fire methods, and even apply CSS custom properties.

In [“A Light Lo-Fi Listen With LFOs”]({{site.basedir}}/examples/07-a-light-lo-fi-listen-with-lfos/) it does a lot. For a start, it is affecting both the `length` and `detune` values of the electronic snare sound, adding texture, tension, and—most of all—variety.

```html
<pads-blam id="snare" out="bus">
  <bank-blam>
    <sample-blam src="/sounds/minimal/snare-01.mp3"></sample-blam>
    <sample-blam src="/sounds/minimal/snare-02.mp3"></sample-blam>
  </bank-blam>
  <blam-blam prop="detune" value="-400|0|0|400|900"></blam-blam>
  <blam-blam prop="length" value="1|1|1|0.25|0.125"></blam-blam>
</pads-blam>
```

Each time the `<pads-blam>` schedules a sound, it fires a `blam` event, letting the `<blam-blam>` elements know in advance. Precisely as the sound is starting to play, a value is randomly plucked from the `|`-separated syntax and applied. One pad; multiple sounds.

## Visualization

The `<analyser-blam>` element converts the incoming signal into frequency data. You can use this data to visualize frequency _bands_ with elements like `<props-blam>` and `<peak-blam>`, which convert the data into CSS custom properties.

But you can also create synchronized visual effects just based on events. In the [“Typerblam”]({{site.basedir}}/examples/typerblam) example, `<blam-blam>` elements create [seed numbers](https://en.wikipedia.org/wiki/Random_seed), as custom properties, with values between `0` and `1`.

```html 
<blam-blam prop="--stretch-x" to="#glyphs" value="0~1"></blam-blam>
<blam-blam prop="--stretch-y" to="#glyphs" value="0~1"></blam-blam>
```

Go to “Info” to read about the full [“Typerblam”]({{site.basedir}}/examples/typerblam) example. It uses a specialized version of `<blam-blam>` called `<one-blam>` to “type” each glyph, in turn.

