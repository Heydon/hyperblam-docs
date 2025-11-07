---
title: Getting Started
---

**HYPERBLAM** is just some JavaScript that  makes some weirdly named HTML elements do some neat things with sounds. 

## 1. Grab the JS

The first thing to do is grab the JavaScript, which is in this zip folder. 

There's no packages to manage, modules to bundle, or build steps to, I don't know, step on.

## 2. Link the JS

Now unzip that folder somewhere you have an HTML file.

To use **HYPERBLAM** elements in that HTML file, you have to add a `<script>` element just before the closing `</body>` tag. 

The `<script>`'s `src` has to point to the `hyperblam.js` file in that folder. That will look a bit like this:

```html
<script src="hyperblam/hyperblam.js" type="module"></script>
```

Don't forget the `type="module"` part. All the **HYPERBLAM** elements are loaded as es modules. The “es” part is short for *especiale*, which is Spanish (ISO code: `es`) for special.

## 3. Start making HTML make noises

Now you can start adding **HYPERBLAM** elements to your HTML. I recommend reading the guides to get a grasp of what's possible. Then take a look at the primers for individual elements. 

You'll be a **HYPERBLAM** native and—by association—a Web Audio and DSP (digital signal processing) native in no time.