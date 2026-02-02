---
title: Midi
---

<chain-blam id="bus">
  <filter-blam freq="3000">
    <lfo-blam target="freq" gain="2500"></lfo-blam>
  </filter-blam>
  <echo-blam beats="0.5"></echo-blam>
  <limiter-blam></limiter-blam>
</chain-blam>
<notes-blam id="hat" out="bus" class="detuned" detune="0">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/tonal/pluck/01.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/tonal/pluck/02.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/tonal/pluck/03.mp3"></sample-blam>
  </bank-blam>
  <midi-blam>
    <on-blam></on-blam>
  </midi-blam>
  <envelope-blam target="detune" curve="-100 0, 0 0.01"></envelope>
</notes-blam>