---
title: detune
---


<pads-blam detune="2000">
  <bank-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/bongos/01.mp3"></sample-blam>
    <!--<sample-blam src="{{site.basedir}}/static/sounds/kit/bongos/02.mp3"></sample-blam>
    <sample-blam src="{{site.basedir}}/static/sounds/kit/bongos/03.mp3"></sample-blam>-->
  </bank-blam>
  <tap-blam target="play">
    <button>Bongo</button>
  </tap-blam>
  <dial-blam target="detune">
    <label>
      detune
      <input type="range" min="-500" max="500">
    <label>
  </dial-blam>
  <blam-blam target="detune" value="-500|0|500" ramp="0.25"></blam-blam>
</pads-blam>