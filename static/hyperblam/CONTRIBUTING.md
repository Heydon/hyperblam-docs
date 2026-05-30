# CONTRIBUTING

Thank you for choosing to help develop **HYPERBLAM**. You will not regret it. It will be one of the top 600—700 decisions you will make in your life (if most of the decisions you make are related to open source contribution).

## Before the specifics

You need to know that **HYPERBLAM** is an experimental project. Not experimental as in careless, half-baked, or “just an idea”; experimental as in made _from_ and made _for_ **experimentation**. 

**HYPERBLAM** is not designed to emulate any specific piece of music hardware or workflow. It is not designed to placate your preconceptions about sampling or DSP (Digital Signal Processing). Making music in the browser, with HTML, is its own thing. And it should be _fun_. 

In general, if your contribution helps **HYPERBLAM** to be experimental and fun, it is welcome. If you bring the practices and expectations of corporate software development to **HYPERBLAM**, it is likely to dilute the fun. Your contribution may not be accepted.

## What would really help

Here are some things that will help make **HYPERBLAM** more robust, lean, versatile, and fun:

- Performance optimizations of any kind. Is there slow code, unnecessary code, or code that can be written with fewer bytes?
- Visualization. Taking data from the `<analyser-blam>` element, what other visualization elements can be made? Are you good with `<canvas>`? Because I’ve only implemented stuff in CSS and SVG so far and there are performance limitations.
- More MIDI. The project has [limited MIDI support](https://git.gay/heydon/hyperblam/src/branch/main/api/On.yml). You can trigger sounds with a MIDI instrument but there’s no MIDI out/syncing. Given the generative features, that could be really powerful.
- New instruments. What would be a good way to make a granular synth or a drone generator?
- Generative features. Are there more and better ways to help compositions “write themselves”?
- Examples. If you make something cool with this, would you like it to be included (with attribution) in [hyperblam.how’s](https://hyperblam.how) examples section?
- Documentation stuff. Is anything unclear in the [**/api** folder](https://git.gay/heydon/hyperblam/src/branch/main/api)? If it’s not an API issue (it’s something else you read on [hyperblam.how’s](https://hyperblam.how)) please leave an issue or PR on the [docs repository](https://github.com/Heydon/hyperblam-docs).
- Offline capability. Some declarative way of choosing to store samples and other assets locally, so compositions can be revisited off-network. IndexedDB?

## What would not help

- TypeScript. Not interested in incorporating TypeScript in any way and not interested in having any arguments regarding this decision. It’s just not **HYPERBLAM’s** style.
- React or other frameworks/libraries, including ones that extend custom elements. Using native custom elements (only) keeps this lean and focused.
- General moaning about the Web Audio API or custom elements. If you prefer your DSP to use other technologies, contribute to a different project.
- Arbitrary changes. Reimplementing features in ways that don’t reduce overall code or make performance or reliability improvements.
- Equivocation and browbeating. **HYPERBLAM** is not your opportunity to exhibit how much you know about JavaScript or DSP. If you can help, help. Don’t use this space to spark interminable pissing contests.