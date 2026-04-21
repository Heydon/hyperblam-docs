---
title: Get started
order: -1
---

**HYPERBLAM** is just some JavaScript (previously LiveScript; AKA ECMAScript) that makes some HTML elements make music in web browsers.

It doesn’t have a complex build or installation process and you can use as much or as little of it as you want. This brief guide will show you how to get up and running.

---

## Structure

The code for [**HYPERBLAM** lives here](https://git.gay/heydon/hyperblam) on **git.gay**. It’s quite a small project that consists of:

1. The **/src** code, divided into 
    - **Elements:** The custom (HTML) element definitions
    - **Primitives:** Some classes that some HTML elements are based on
    - **Tools:** Some little helper scripts
2. A minified version of that code, under **/dist** (including a zip archive).
3. The **/api** documentation, explaining how to use everything (and prettified into the [elements pages](http://localhost:8080/elements/)).

![Diagram showing how the Hyperblam elements and the API docs arrive at this website. Hyperblam itself is used in the example pages and the API docs make up the elements pages.]({{site.basedir}}/static/images/illustrations/get-started2.svg)

## Installation

To use **HYPERBLAM** you need an HTML web page that imports the code as a module. So, grab and unzip [the code](https://git.gay/heydon/hyperblam/raw/branch/main/dist/hyperblam.zip) and add the following to the bottom of the page (before the closing `</body>` tag). 

```html
<script type="module" src="path/to/hyperblam/dist/hyperblam.js"></script>
```

This **hyperblam.js** script will...

1. Look for **HYPERBLAM** elements in the page and initialize (“upgrade”) them. Nothing that isn’t used is installed.
2. Fire a `blamready` event when this is taken care of. Use this event if you want to do something _after_ **HYPERBLAM** is ready.

![A web page has some JavaScript injected into its foot and it explodes with loud sounds from its center.]({{site.basedir}}/static/images/illustrations/get-started1.svg)

<p class="u-note">
    <strong class="u-note__shout">All set!</strong> Now take a look at the <a href="/guides">other guides</a>—or head over to see some <a href="/examples">live examples</a>.
</p>


