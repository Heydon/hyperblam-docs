---
title: Signal chains
---

Like most projects and libraries based on the Web Audio API, **HYPERBLAM** lets you create *signal chains*. Unlike other projects and libraries, **HYPERBLAM** lets you do this just by writing HTML, using custom elements.

But what is a signal chain anyway?

---

If you’re a guitarist, you’ll no doubt be familiar with the concept of the *pedal board*: a physical platform, usually lavished with Velcro™️, onto which you affix all the expensive guitar effect pedals (or *stomp boxes*) you’ve accumulated. 

Typically, you have one guitar (the input) and one guitar amplifier (the output). To make sure all of your pedals contribute to your sound, you put them in series between your guitar and amp.

![A signal chain for a guitar, starting with the guitar itself, connected to a row of effects and finally connected to an amplifier.]({{site.basedir}}/static/images/illustrations/signal-chains1.svg)

Maybe you’re not a guitarist. Maybe you have even more disposable income and you’re into *modular synthesis*. In modular synthesis, individual *modules* are connected (or “patched”) together. These, like guitar pedals, may represent effects, used for coloring the incoming sound, or they may perform more complex tasks like [*sequencing](*https://rubadub.co.uk/products/moog-labyrinth-parallel-generative-analog-sequencer*)*. Your modular synthesizer, like a pedal board, represents a *signal chain*.

Both guitarists and modular synthesis fans spend a lot of their time struggling with wires and trying to join them up to the right places. Literally and figuratively, **HYPERBLAM** requires a lot less wiring.

## Modules as nodes

In the Web Audio API, each module in your signal chain is based on an interface called `AudioNode`. Just as in modular synthesis, these can represent sound sources, as well as effects, filters, and other kinds of *signal processing*.

In **HYPERBLAM**, many of the elements are HTML interfaces for one or more `AudioNode`s. The `<pan-blam>` element houses a `StereoPannerNode` and its `pan` prop’ lets you adjust the `StereoPannerNode`’s `pan` [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam). This is a lot simpler when translated to HTML:

```html
<pan-blam pan="0.5"></pan-blam>
```

In isolation, this panner doesn’t do anything even remotely useful. It needs both an incoming signal and an output or *destination*.

## Declarative chaining

Imagine you’re creating a signal chain that starts with a sound retrieved from an `<audio>` element, is passed through a gain node, then a panner node, and is finally sent to your speakers. In its simplest form, that would look something like this:

```jsx
const context = new AudioContext();
const sampleElem = document.querySelector('audio');
const sample = context.createMediaElementSource(sampleElem);
const panNode = context.createStereoPanner();
panNode.pan = 0.5;
const gainNode = context.createGain();
gainNode.gain = 0.75;
sample.connect(gainNode);
gainNode.connect(panNode);
panNode.connect(context.destination);
```

That doesn’t really look, or feel, like a pedal board—or a modular synthesizer— to me. This is what it looks like in **HYPERBLAM** (including the sample source omitted from the above example):

```html
<audio-blam>
  <notes-blam>
    <chain-blam>
      <gain-blam gain="0.75"></gain-blam>
      <pan-blam pan="0.5"></pan-blam>
    </chain-blam>
    <bank-blam>
      <sample-blam src="/path/to/sound.mp3"></sample-blam>
    </bank-blam>
  </notes-blam>
</audio-blam>
```

![A flow diagram for a signal chain. An instrument on the left points to a chain element, which groups a gain and pan effect. Finally, the chain is connected to two speakers, indicating the output.]({{site.basedir}}/static/images/illustrations/signal-chains2.svg)

These kinds of higher level APIs are usually the tip of a giant **JavaScript Library Iceberg**. Not so with **HYPERBLAM**. Adding a `<pan-blam>` element (or 37 `<pan-blam>` elements, for that matter) costs you approximately `700` bytes. And that includes `wet` and `dry` props for controlling the *mix*.

Take the `<pan-blam>` element away, and those `700` bytes go away with it. That’s because **HYPERBLAM** only imports the elements you *actually use*. It doesn’t use a complex bundling system to do this—just dynamic imports based on simple DOM queries. The installation routine itself costs about `600` bytes.

For context, **Tone.js** is over `330KB` of JavaScript. Making something *with* **Tone.js** means writing a lot more JavaScript on top of that. The aim of **HYPERBLAM** is to save you writing *any* JavaScript. It’s all just HTML.

## Chains within chains

In many ways, chains in **HYPERBLAM** are treated like the pedals (“boxes” in **HYPERBLAM** terms) they chain together. You can include a `<chain-blam>` within another `<chain-blam>` to group boxes together.

```html
<chain-blam>
  <pan-blam pan="0.25"></pan-blam>
  <chain-blam dry="1" wet="0.25">
    <reverb-blam cutoff="2000">
      <sample-blam src="/path/to/ir.mp3"></sample-blam>
    </reverb-blam>
    <echo-blam feedback="0.666"></echo-blam>
  </chain-blam>
</chain-blam> 
```

In this case, you benefit from being able to control the *mix* (`dry` and `wet` ratio) for reverb and echo simultaneously.

## Chaining chains

With individual (real, physical, *outernet*) guitar pedals going for anything from `$50` to `$300`, a modest pedal board is going to set you back around `$1000`. **HYPERBLAM** pedal boards cost you *nothing*, so why only have one? Then why not connect lots of boards together to make one giant ***MegaZord Board***?

By default, any `<chain-blam>` element connects directly to the nearest `<audio-blam>` output. But if you point the `<chain-blam>`’s `out` prop at another `<chain-blam>`’s  `id`, it will pass through that first.

In practice, this means you can create *many-to-one* relationships. For example, two guitar sounds can be panned right and left, then connect to the same reverb [*bus*](https://en.wikipedia.org/wiki/Audio_bus).

```html
<chain-blam id="bus">
  <reverb-blam wet="0.33">
    <sample-blam src="/path/to/ir.mp3"></sample-blam>
  </reverb-blam>
</chain-blam>
<!-- ... -->
<chain-blam out="bus">
  <pan-blam pan="0.5"></pan-blam>
</chain-blam>
<!-- ... -->
<chain-blam out="bus">
  <pan-blam pan="-0.5"></pan-blam>
  <filter-blam freq="4000"></filter-blam>
</chain-blam>
```

![In this example, there are two parallel instrument tracks, each connected to its own pan effect. These two pan effects then converge on a single reverb effect and the reverb connects to the speakers.]({{site.basedir}}/static/images/illustrations/signal-chains1.svg)