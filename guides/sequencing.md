---
title: Sequencing
---

If you're familiar with JavaScript (my sympathies), then you're probably familiar with events and event listeners. Fundamentally, events let a JavaScript application *talk to itself*.

Musicians are event emitters and listeners too. A drummer hits their sticks together to count their band in. A bassist performs an elaborate arpeggio to herald a group transition. An orchestral conductor is essentially a high frequency JavaScript event emitter in humanoid form.

**HYPERBLAM** enables generative composition by handling *events* according to *probabilities.* But you don't actually have to write the JavaScript for those events; the HTML elements take care of that for you.

---

## Events-based sequencing

The `<sequencer-blam>` element has quite a simple task. It acts as a kind of silent metronome, counting out every step (a quarter-beat, by default) in an infinite sequence. When it knows the exact time the next step should land, it emits a `blam` event communicating that timing. 

Any **HYPERBLAM** elements listening for that `blam` event can synchronize itself to the ongoing sequence. 

[diagram: show timeline]

This opens up some possiblities. You *could* take a steam of live data and use it to trigger `<notes-blam>` sounds directly. A live, but perfectly *quantized*, musical performance of the stock exchange? Or weather patterns? Github commits?

More commonly, you would subscribe to a `<sequencer-blam>`'s events using a `<track-blam>` element. That's where **HYPERBLAM** starts to feel like a drum machine. And it's a one with some pretty cool features, similar to the high-end hardware machines from Elektron or Roland.

## Polymetrics

Each `<track-blam>` element presides over one or more `<bar-blam>` elements. The `s` prop (for “sequence”, “steps”, “sounds”, or whatever works best for you) sets out the pattern for that bar. For an instrument like the percussion-optimized `<pad-blam>`, positive integers represent different samples belonging to a `<bank-blam>`.

[example with figcaption explaining all the ciphers]

[diagram: single bar with 8 beats]

Good start. But what if I introduce another `<track-blam>`with a bar of a different length?

[diagram of both tracks]

The tempo of these two tracks is shared (taken from a common `<sequencer-blam>`'s `bpm`) but their *time signatures* differ*.* The result is *polymetric:* beats stay obstinately in sync but the bars they belong to diverge*.* 

Working with polymeters is fun because the relationship between the individual tracks changes over time. Since it's difficult (at least for me!) to anticipate what that shifting relationship will sound like, the music stays fresh for longer.

## Overrides

We have something to address. In most drumbeats, the kick and snare should occupy their own space. A drummer very rarely plays those two drums at the same time. But, as polymetric track relationships shift over time, collisions are inevitable. 

[diagram: two bars; in the second, snare and kick meet]

This is where overrides come in. Using the `override` prop, I can set which tracks take precedence, thereby avoiding collisions. 

[demo with option to turn off override]

This goes a surprisingly long way to making a simple polymetric arrangement sound like an improvising drummer choosing, in the moment, where to place their kick and snare. But overrides aren't just for drums. You can use them to carve out space for any sounds.

## Probabilism

Multiple **HYPERBLAM** elements are based on a primitive element called `Event.js` which takes care of generic event handling. All these elements inherit a `chance` prop that determines how likely the element will respond to a subscribed event. Playing, detuning, filtering, panning, muting, pretty much anything can be *left to chance*.

[diagram]

The `<track-blam>` element calculates whether a sound should play, at any given time, based on interactions between probabilities, overrides, and other settings. Once you put these conditions in place, you can just sit back and listen to the composition write itself in real time.

[demo]

Using generative AI, you can ask for a “sultry country song” and you'll receive 637 low quality mp3s having a plagiaristic lemon party in your long-suffering ear holes. True generative music making isn't about resurrecting the dead. With a handful of kilobytes, you can set about making something genuinely new.