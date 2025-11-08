# HYPERBLAM

**HYPERBLAM** is an HTML-based interface for sampling, processing, and sequencing audio in the browser.

* **_Declarative_**: custom elements FTW (write music, not JavaScript)
* **_Independent_**: Built from the ground up. Free of monolithic libraries and proprietary technologies.
* **_Powerful_**: use as many effects, LFOs, and auxiliary envelopes as you want
* **_Flexible_**: create polymetric beats, generative drones, or event-based sound effects for your game
* **_Probablistic_**: emulate improvisation using multiple random factors and modulations
* **_No AI_**: this is for musicians, sound designers, and geeks—not charlatans or ghouls
* **_Unopinionated_**: bring your own UI

## TODO

- [ ] Key shortcuts for `Tap.js`
- [ ] Loading of samples on different events!
- [ ] Ability to suspend any events (Boolean in `Event.js`)
- [ ] `<mod-blam>` should group event-based elements so multiple things can be discretely modulated?
- [ ] Find way to add more data, easily, for CSS custom properties
- [ ] Props versus params are a mess
- [ ] Maybe update param in prop getter directly? The `calibrate()` can be ignored
    - This could be used in combination with creating getters and setters for `params` dynamically, so props for params don't need to be built out in each case
        - Then the calibrate method can be ignored?
    - [ ] Maybe separate blam-blam into param-blam and prop-blam again?
    - [ ] Rethink entire props/params relationship, possibly even rethink `exposeParams`.
    - [ ] Maybe Box calibration only happens once, so param changes don't trigger `calibrate()`
        - [ ] Maybe `calibrate()` then becomes `init`
    - [ ] `Dial` and `Switch` reacting to param changes may be tricky. Already experimented and it got hairy. 
- [ ] `ended` event may come in useful
- [ ] `<notes-blam>` is not respecting bar-blam values
- [ ] Test that `beats` actually is in sync correctly for Echo, LFO, and others
- [ ] Granular synth
    - [ ] Soledad on `AudioWorklet`: https://soledadpenades.com/posts/2025/using-audioworklets-to-generate-audio/
    - [ ] Basic granular synth tutorial: https://dev.to/hexshift/granular-synthesis-in-the-browser-using-web-audio-api-and-audiobuffer-slicing-2o9h
- [ ] Volume meter woklet (good for animation) https://googlechromelabs.github.io/web-audio-samples/audio-worklet/basic/volume-meter/
- [ ] Extracting jsdoc as JSON (see `-X` option) and pipe to file https://stackoverflow.com/questions/25210156/getting-jsdoc-output-in-json-format
- [ ] Oscilloscope tutorial: https://davidmatthew.ie/creating-an-oscilloscope-with-javascript/
- [ x ] `Monitor` x -> Extend `PropParamMethod` (or just `Event`?) to do a `shift-blam`. 
    - It contains its own LFO and attached analyser to get a multiplier based on the LFO's gain. This is used to change values based on incoming events over time.
- [ x ] display element
- [ ] Method on `<blam-blam>` so it can be controlled by `<switch-blam>` etc?
- [ ] param values do not update Dial
    - Need to better connect params and props. This will fix a lot of issues.
- [ ] `param` Dial values (e.g. `detune`) don't stick for players because each new buffer is refreshed at the standard detune level
- [ ] Retrig prop for `Track`
    - Can use events to make certain `steps` retrigger
    - The value is divisions of a (quarter)-beat. So `3` would mean play a triplet rather than 1 note;
- [ x ] Control props like probability using LFO value at time?
    - See https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData
    - No need for a loop. Just do `analyser.getFloatTimeDomainData(dataArray)` on any other event. 
- [ x ] Test `Dial` using `bpm` (remember to add the `bpm` target + use `super.modify` after `this.value` is set)
- [ x ] Redo watcher stuff
- [ x ] Revisit how to handle when elements are defined
    - Should there be one event when installation is finished? On `window` and elements
    can innit based on that?
- [ x ] Do events have a generic name so they can be tapped into more easily? 
    - `step`, `bar`, `play` all `blam`?
    - an agreed structure for the data with reserved names for conditions.
- [ ] Think about how release would work. Do I need to save multiple instances of buffers? 
    - I can't set it as the next buffer is started because then its exposed params are overwritten
    - May need to save the whole of the old instance, including params
- [ x ] Test multiple tracks with one player (whole drum kit)
- [ x ] Rename `machine-blam` and `instrument-blam` to `pads-blam` and `notes-blam`
- [ x ] Bring back length prop for Player
- [ ] Remove mute functionality from Player, to save memory? Can just use a `gain-blam` node instead...
- [ x ] Do `prop-blam` event element
- [ x ] Start making control elements (sliders and switches)
- [ ] Implement proper portamento for notes-blam
- [ ] Create attack/hold/decay (AHD) element (better than envelope for fluctuation values?)
- [ ] Fix event param issue with multiple `subs`. Each change is applied to every `sub` at that exact time. Sometimes `sub.param` comes up as `undefined` too.
    - Think I'd have to identify and pair individual `pubs` and `subs`. Maybe needs a grouping mechanism? Or use indices?
- [ x ] Get `solo` prop' and `playOrNot` logic into `Track`
- [ ] Think about adding scales, like Digitakt
- [ x ] How does the track cipher come into priming tracks? Can that be worked out in sequencer??
- [ x ] Fix sequencer/track relationship by "priming" tracks in the sequencer. Each should have `probable` set using `!t.suspend && this.random.chance(this.chance)` just before the `'step'` event! Then the proboability stuff in `Track` can go.
- [ ] Create wave/oscillator instrument
    - [ ] Use FM synthesis. The main element is the carrier and descendent elements are modulators.
    - [ ] Different modulation styles/algorithms (can parallel modulate the carrier and/or modulate modulators with other modulators)
- [ x ] FILLS! The `<bar-blam>` element can be shuffled each time it’s accessed (or at the bar event)
- [ x ] Experiment with dynamic import of envelope drift function
- [ x ] Change `getOut` so nested `<chain-blam>` elements don't short circuit and connect back to their parent `<chain-blam>` elements
- [ x ] Test multiple chains
- [ x ] Test chains inside chains
- [ x ] Simplify installation further
    - Make it just a `<script>` with `src`. 
    - For getting the path, include that as `data-blam-path=""` _on the script tag itself_.
    - Or dynamically get path by looking up from `install` script location?
- [ x ] Do delay box next. Make sure its frequency can be modified in terms of beats.
- [ x ] Attack, decay, and release elements (sustain not possible with samples)
    - Revisit release. Think it was broken before because it worked on the current temp gain, not the previous one
    - These work directly with instruments, not anything else
- [ x ] Allow linear ramp for any `<param-blam>` change (do set value unless a `portamento` (or something) value is given) 
- [ ] Slicer instrument
    - [] Dynamically creates slices based on steps provided (`8` equals 8 slices)
    - [] See https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start (use offset and duration)
    - [] cipher now relates to slices, not samples. But all other aspects are the same (random slice or robin picks slice)
    - [ ] Allow a `bpm` or `tempo` prop on `sample-blam` so that beat matching can happen for players (a whole beat can be detuned to the set `bpm`).
    - [ ] To keep in sync as `bpm` shifts, might need to observe `bpm` to dynamically change `playbackRate`...
- [ ] Make sure all opportunities to avoid calculation-on-the-fly are taken. See envelope, where curve is only parsed when attribute changes
- [ x ] Continue to investigate `<param-blam>` pops
    - Only seems to happen when interrupting an already playing sound?
    - First fix static registry thing where `<envelope-blam>` is registered as `<param-blam>` (static thingy).
        - May need to abstract the param stuff further (move main param code to a helper)
    - Then see if pops still occur when the envelope is very short (already set up for testing)
- [ x ] For any event (param, prop) change, support add `chance` (probably on `Event` element).
- [ x ] Ability to fluctuate envelope value/curve.
- [ x ] Make sure `chain-blam` works with no boxes/effects in it (short circuit chaining)
- [ ] Different arpeggiation options for instrument: true random, random but always new, robin, and up/down
- [ ] UI: Sliders
    - [ ] Basic slider looks for param and, if it can't find it, looks for prop instead
    - [ ] METAslider controls multiple sliders at once
- [ ] Find a reusable way to get the closest time set?
- [ ] Beat translation for LFO should be easy: when connecting, get the translated `beats` value and translate the LFO `gain` value. Connect using those values.
- Nodes as "boxes"?
- [ ] Make nodes use `mix` (calculate `dry` and `wet` automatically)
- [ ] Allow for beats or seconds for time values. Is there a way to translate on the fly?
- [ ] Maybe store translation algorithms for different params. Then, "if param is 'frequency', use the translation"
- [ x ] Implement the `z` syntax for envelope
- [ ] `release` doesn't work because the `prevGainNode` is changed as the next buffer is played. May need to track `prevGainNode`s and clean them up only when their buffer goes past its duration.
- [ x ] Make `exposeParams()` function that fires an event on the element with params, so that nodes that need to _connect_ (like LFO, not like envelope) can do so.
- [ ] Ability to reuse chunks of HTML (subtrees), like `<c-lone>`
- [ ] Different types of `<track-blam>`. Each use scheduler, but act more like `Event.js` and values affect any param or prop (!!!)
- [ x ] Looping element (drone?) with exponentially adjusted crossfade.
- [ x ] Do separate events for before (the currentTime) and on (the currentTime) for scheduling and timing animations etc
- [ ] Remember to change Sequencer to set `player.time` before running `play()`.
- [ ] Handle `.`, `_`, and `?`, in Sequencer. The `?` just means "don't add a cipher arg".
- [ ] Make separate `event.bar` and `event.play`?
- [ ] Automate UI creation by "spreading" bank sounds to buttons in a loop
- [ ] Enable dynamically loading sounds. When a bank's samples change, send event (MutationObserver?)
- [ x ] Revisit muting. Should be an autonomous method that toggles on or off according to a control or event.
- [ ] Move assignMIDI from instrument to MIDI element?
- [ x ] Replace `if (!this.sound || this.sound === '?') {` in Player. In sequencer, just don't assign an arg
- [ x ] Maybe set `time` as `this.time` on the player. Could be easier for syncing stuff. 
- [ ] Choke should take value, then decay (for crossfade) can come from somewhere else (?)
- [ ] For drone, will need to use duration to know when to restart the buffer.
- [ ] Investigate the ability to edit HTML (in general) after samples loaded / sequencer playing. Does it already work? Does it need `MutationObserver` in places?
- [] Autodetect pitch? https://alexanderell.is/posts/tuner/

- Basic, reusable element finding function (look for `id` then look for descendant)
    - Maybe option for child versus descendant
- Use internals to deal with shared styles, like `display: contents`
- Simplified player logic with plugin capability
- Easy `<c-ontrol>` element that knows what kind of input to render for a param/prop. Typing may be needed.
- Rename `<s-rc>` to `<s-ample>`
    - Only listen for `<s-ample>`s loading
    - Maybe categorize samples with keyword, rather than using a `<l-ibrary>`
- Types of player: `<s-ampler>`, `<i-nstrument>`, `<d-rone>`
- CSS `@scope` for encapsulating styles to components without shadow DOM
- `<e-nvelope>`, like `<l-fo>` (listens to `play()` on instrument/sampler and resets then ramps)
    - Could refine stops, as children, for ramping like `<s-top value="[x]" offset="[n]">`
        - `offset` would be the time after the `play()` event, using `currentTime`
        - `value` would be the value of the parameter defined by the parent `<e-nvelope>`
        - First stop would need to `setValueAtTime` and others would ramp…
        - This and other more complex data may benefit from being serialised into actual data for performance. Only gets reserialised when a stop value changes.
- Dynamically name elements based on class name: Audio → a-udio. Have this function on the Base element. Do registering in static function in constructor.
- Wait for all elements to be defined before doing any inter-element stuff? Fire an event?
    - See https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined
    - Make use of `querySelectorAll(":not(:defined)");` (empty nodeList if everything is defined already)


What if HTML wasn’t just for text and images and stuff? What if it was for music too? Yes, we have `<audio>`, but that's just a music *player*. That’s for music someone's already made. To compose and produce music in HTML, like we write and typeset our shitposts, we need certain capabilities. We need sampling, signal processing, and sequencing.

“You can do that all with JavaScript.” Sure, you can, but music—like prose—is declarative, not imperative. So writing music with JavaScript is pretty unweildy and notably lacking in joy. 

By using custom elements, we can make the Web Audio API HTML's domain instead. That's what **HYPERBLAM** is all about, and more.


## Beats translation pseudo-code

```html
<lfo-blam param="detune" beats="1" gain="50">
    <lfo-blam param="beats" beats="1" gain="0.5"></lfo-blam> <!-- modulates from 0.5 to 1.5 (center: 1) -->
</lfo-blam>
```