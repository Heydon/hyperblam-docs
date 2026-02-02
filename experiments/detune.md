---
title: Detune
---


<pads-blam id="hat" choke>
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/hat/01.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/hat/02.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/hat/03.mp3"></sample-blam>
  </bank-blam>
</pads-blam>
<pads-blam id="snare" length="0.25" detune="100">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/snare/01.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/snare/02.mp3"></sample-blam>
  </bank-blam>
</pads-blam>
<pads-blam id="kick" gain="0.6">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/kick/01.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/kick/02.mp3"></sample-blam>
  </bank-blam>
</pads-blam>
<notes-blam id="bass" choke>
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/bass/01.mp3"></sample-blam>
  </bank-blam>
  <chain-blam>
    <!--<filter-blam freq="20000" q="10">
      <envelope-blam target="freq" curve="100 0, 20000 0.2"></envelope-blam>
    </filter-blam>-->
  </chain-blam>
  <blam-blam target="length" value="0.25|0.125|1"></blam-blam>
</notes-blam>
<sequencer-blam bpm="80" swing>
  <track-blam subs="#hat">
    <bar-blam s="1 0 2 0 1 0 3 0 1">
  </track-blam>
  <track-blam subs="#snare" override="kickTrack" chance="0.7">
    <bar-blam s="0 0 ? 0 ? 0 0 ?"></bar-blam>
  </track-blam>
  <track-blam subs="#kick" id="kickTrack">
    <bar-blam s="1 0 1 0 2"></bar-blam>
  </track-blam>
  <track-blam subs="#bass" chance="0.75">
    <bar-blam s="E 0 D 0 G#"></bar-blam>
  </track-blam>
</sequencer-blam>
<tap-blam subs="sequencer-blam" target="playPause">
  <button>Play / Pause</button>
</tap-blam>

<!--<notes-blam choke notes="C4">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/hat/03.mp3"></sample-blam>
  </bank-blam>
  <tap-blam target="play">
    <button>Bongo</button>
  </tap-blam>
  <chain-blam>
    <pan-blam pan="1">
      <blam-blam target="pan" value="-1~1"></blam-blam>
    </pan-blam>
    <reverb-blam>
      <sample-blam src="{{site.basedir}}/static/sounds/IRs/plate.mp3"></sample-blam>
    </reverb-blam>
  </chain-blam>
  <dial-blam target="detune">
    <label>
      detune
      <input type="range" min="-500" max="500">
      <display-blam prop="detune" element="pads-blam"></display-blam>
    <label>
  </dial-blam>
  <switch-blam target="detune" value="-300">
    <label>
      detune
      <input type="checkbox">
    </label>
  </switch-blam>
  <envelope-blam target="detune" curve="-500 0, 500 0.02, 0 0.04"></envelope-blam>
  <blam-blam target="length" value="0.25"></blam-blam>
</notes-blam>-->