---
title: Humanization
---

Put some samples in a sequence and it can sound stiff, robotic. At least, it can without some intervention. That's because computers are too *on the beat;* too *tight.*

But you can get around that. You can humanize electronic music in lots of different ways and **HYPERBLAM** lets you combine a number of different techniques. Get loose, get wobbly, get downright *shambolic* if that’s your bag.

## Multiple samples

Drummers are only human, so every *hit* they make is a little different. Louder, quieter, sharper, duller. If they lift the stick quickly, the sound rings out. If they leave it down, the sound is cut short.

The easiest way to make a sampled snare sound like a real snare is to sample a drummer playing it multiple times. It's the perfect route to imperfection.

By default, **HYPERBLAM** instruments will play a different sample from their sample bank each time. The more samples you include, the more variety.

![Three buffers converge on an icon of a dice which, in turn, points at a source node.]({{site.basedir}}/static/images/illustrations/humanization1.svg)

A tonal instrument like the standard `<instrument-blam>` will select random samples even as it is augmenting their pitch. This multidimensional variation is not common even in expensive, commercial sample-based instruments. At least, not without a lot of configuration. 

## Randomized parameters

Including more than a few samples (even when using optimized, next-gen audio formats) is costly in memory. *Emulating* natural variation is more efficient.

Each sample is represented as an `AudioBufferSourceNode`, which comes with certain properties called `AudioParam`s. The `detune` param’ can be adjusted in *cents*.  

![A detune parameter, represented as a dice, pointing to a source node.]({{site.basedir}}/static/images/illustrations/humanization2.svg)

Applying the same `detune` value to all samples alike will change the base tuning of the snare, which may be desirable. But *fluctuating* the `detune` value is useful for humanization.

By including a `<param-blam>` element, which points to the instrument's `detune` property, and uses `value="-25~25"`, the pitch of each successive snare sound will be detuned by *somewhere* between -25 and 25 cents. 

The pitch of a snare is affected by how close to the center you strike it. So this is a reasonably realistic but efficient way of introducing humanization. Applying this technique across a bank of alternative samples is doubly effective. 

## Swing

Consider the following pattern, wherein `1`s represent sounds.

```jsx
1 1 1 1 1 1 1 1
```

That's one sound played 8 times in a regular, or *straight,* fashion. Nit very inspired. Now consider this pattern, wherein the `0`s represent pauses. 

```jsx
1 0 1 1 0 1 1 0 1 1 0 1
```

Notice how the sounds bunch together into pairs. This gives the rhythm a kind of *elasticity* sometimes called *swing*. At faster tempos, it becomes more of a *shuffle*. In any case, this elasticity gives your music a perculiar kind of sexy and infectious energy. 

But we have a problem. To achieve this effect, we have to divide the pattern into sets of three, or *triplets*. It makes the pattern longer (messing with the overall tempo) and harder to read.

Instead, we can apply swing using the `<sequencer-blam>` element's `swing` prop. This pushes every other beat up against the next. By default, these shifted beats are moved *one sixth of one quarter-beat* to the right. Effectively, this makes them the third beat in *a imaginary triplet spread over two quarter beats (or one half beat)*.

![Diagram comparing straight and swing patterns. In the swing version, a dot representing the second of three beats is swung to the right.]({{site.basedir}}/static/images/illustrations/humanization3.svg)

In practice, it turns that original, straight pattern into this:

```jsx
1  11  11  11  1
```

Using triplets, either compositionally or algorithmically, may not give you *precisely* the amount of elasticity you're looking for. 

So, while you can apply `swing` as a Boolean attribute and get `0.333` of swing, you can adjust the proportion to taste by supplying an explicit value. This is in keeping with classic hardware drum machines and grooveboxes, which typically offer variable swing. 

## LFOs

Low Frequency Oscillators offer humanization opportunities as well. But LFOs can do a *lot* more besides, so head over to the [**LFO guide**]({{site.basedir}}/guides/LFOs) for a proper introduction.