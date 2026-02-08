---
title: Detune
---

<pads-blam id="hat" choke gain="1.5">
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
  <track-blam to="#hat">
    <bar-blam s="1 0 2 0 1 0 3 0 1">
  </track-blam>
  <track-blam to="#snare" override="kickTrack" chance="0.7">
    <bar-blam s="0 0 ? 0 ? 0 0 ?"></bar-blam>
  </track-blam>
  <track-blam to="#kick" id="kickTrack">
    <bar-blam s="1 0 1 0 2"></bar-blam>
  </track-blam>
  <track-blam to="#bass" chance="0.75">
    <bar-blam s="E 0 D 0 G#"></bar-blam>
  </track-blam>
</sequencer-blam>
<tap-blam to="sequencer-blam" target="playPause">
  <button aria-pressed="false">{% icon 'playPause' %}</button>
</tap-blam>

{% dialog %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lorem lacus. Donec pharetra risus nec mauris venenatis lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis quis dolor ipsum. Aliquam ac rhoncus augue, at eleifend eros. Sed nibh nisi, blandit a tristique sed, faucibus a nisi. Cras vitae posuere sapien, at tempor justo. Aenean molestie consequat nibh vitae sagittis. In maximus, mi in porttitor interdum, orci nisl eleifend ante, sit amet euismod lacus leo id nunc. Nunc sed porta nisl, sed molestie velit. Aliquam metus dui, maximus in tempus ac, tristique a nibh. Ut eget nisi eget arcu porttitor sollicitudin. Etiam cursus condimentum arcu, aliquam ultrices turpis commodo vestibulum. Fusce ultricies, est a pharetra volutpat, sem mi elementum dolor, ac mollis odio augue a lectus. Praesent gravida sem at porta mattis.

Duis pharetra at sem eu mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt ex sit amet orci tempor commodo. Phasellus sodales porta augue aliquet porta. Ut iaculis aliquam egestas. Donec facilisis eleifend suscipit. Proin imperdiet leo at fermentum feugiat. Praesent nec ipsum odio. Proin felis mi, pellentesque auctor pharetra vitae, ultrices quis massa. Vivamus volutpat interdum lacus, vel egestas purus dignissim eget. Etiam rhoncus fringilla felis non facilisis. Duis eget ligula orci. Phasellus tellus ligula, imperdiet porttitor enim ac, dapibus viverra elit. Donec ut mi convallis, convallis leo sit amet, facilisis dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

In mauris lectus, dignissim vitae bibendum id, consectetur in nibh. Quisque pellentesque arcu vitae erat elementum dapibus. Duis euismod risus odio, ac sollicitudin lorem placerat non. Ut convallis ante ex, non lobortis est scelerisque quis. Praesent id gravida felis. Curabitur pretium id nunc ut dignissim. Nunc quam odio, semper vitae arcu eu, auctor vestibulum risus. Aliquam sed nunc vitae est luctus efficitur nec eget eros. Duis nec viverra massa. Etiam dictum condimentum cursus. Sed sed lorem consequat, rutrum augue at, laoreet nunc. Integer efficitur sit amet odio tempus aliquam. Mauris congue sollicitudin porta. Sed ut arcu tempor enim molestie dignissim.

Donec quis sem mi. Aliquam erat volutpat. Maecenas ut tempor ex. Maecenas id vulputate dolor. Ut eget libero dignissim, ullamcorper diam vel, feugiat sem. Vestibulum placerat magna quis ullamcorper elementum. Suspendisse pretium, purus in ornare fermentum, arcu massa maximus augue, in fermentum est lacus eu ante. Suspendisse eget sem eget odio dignissim venenatis. Suspendisse ultrices auctor lorem. Duis nec eros sed mi lobortis sagittis. Vestibulum sollicitudin neque ac felis volutpat blandit. Sed nec mauris est. Maecenas mauris lacus, efficitur et cursus ut, aliquam vehicula metus. Sed neque nulla, aliquet vel erat sit amet, lacinia fringilla ex. Quisque nibh lacus, condimentum pharetra mattis non, vehicula vitae tellus.

Mauris lorem nisl, varius sit amet sapien in, bibendum molestie sapien. Nunc vitae neque sodales, vehicula arcu non, rhoncus justo. Maecenas posuere tellus nec metus commodo faucibus. Vivamus tempor pharetra suscipit. Nam eu mi risus. Sed at orci fermentum, pulvinar nunc ut, lobortis arcu. Maecenas bibendum justo non tincidunt tincidunt. Praesent sapien massa, vehicula vehicula rutrum ut, finibus eget arcu. Praesent sagittis odio porta tortor porttitor semper. Duis quis pretium lorem. Quisque elementum tempor nunc in mollis. Duis vulputate ipsum fringilla eleifend elementum. In vestibulum urna enim, at efficitur justo tristique nec. Aliquam ante purus, molestie vel dignissim non, tincidunt mattis eros. Mauris eget nisl diam. 

{% enddialog %}

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