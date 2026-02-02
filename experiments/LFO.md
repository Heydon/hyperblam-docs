---
title: LFO
---

<chain-blam id="bus">
  <!--<filter-blam freq="3000">
    <lfo-blam target="freq" gain="2500"></lfo-blam>
  </filter-blam>-->
</chain-blam>
<pads-blam id="hat" choke out="bus" class="detuned" detune="0">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/hat/01.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/hat/02.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/hat/03.mp3"></sample-blam>
  </bank-blam>
  <blam-blam target="detune" value="-500|-1000|200" revert ramp="0.5" chance="0.25"></blam-blam>
</pads-blam>
<pads-blam id="snare" detune="500" out="bus" class="detuned">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/snare/01.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/snare/02.mp3"></sample-blam>
  </bank-blam>
</pads-blam>
<pads-blam id="kick" gain="0.6" out="bus">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/kick/01.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/kick/02.mp3"></sample-blam>
  </bank-blam>
</pads-blam>
<!--<lfo-blam target="detune" gain="500" beats="8" out=".detuned"></lfo-blam>-->
<sequencer-blam bpm="80">
  <track-blam to="#hat" id="hatTrack">
    <bar-blam s="1 0"></bar-blam>
    <!--<mod-blam target="chance" value="0.5" gain="0.5" beats="64">
      <blam-blam from="#hatTrack" target="suspend" chance="0.5"></blam-blam>
    </mod-blam>-->
  </track-blam>
  <!--<track-blam to="#snare" override="kickTrack">
    <bar-blam s="? 0 ? 0 ? 0 ? 0"></bar-blam>
  </track-blam>
  <track-blam to="#kick" id="kickTrack" suspend>
    <bar-blam s="1 0 1 0 2"></bar-blam>
  </track-blam>-->
</sequencer-blam>
<tap-blam to="sequencer-blam" target="playPause">
  <button aria-pressed="false">Play / Pause</button>
</tap-blam>