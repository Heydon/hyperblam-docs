---
title: Get started
order: -1
---

**HYPERBLAM** is just some JavaScript (previously LiveScript; AKA ECMAScript) that makes some HTML elements make music in web browsers.

It doesn’t have a complex build or installation process and you can use as much or as little of it as you want. This brief guide will show you how to get up and running.

---

<aside class="l-with-sidebar c-sandbox" aria-describedby="sandbox-label">
    <img src="{{site.basedircdn}}/static/images/sandbox.svg" alt="A bucket and shovel in a pile of sand">
    <div class="l-flow">
        <h2><a href="https://codepen.io/heydon/pen/RNKgMEe" id="sandbox-label">Try the sandbox!</a></h2>
        <p>Probably the easiest way to get started is opening up <a href="https://codepen.io/heydon/pen/RNKgMEe">the sandbox</a>, hosted on codepen. You get a tune with a lot of samples, different instruments, and effects to mess about with or swap out.</p>
    </div>
</aside>

## Structure

The code for [**HYPERBLAM** lives here](https://git.gay/heydon/hyperblam) on **git.gay**. It’s quite a small project that consists of:

1. The **/src** code, divided into 
    - **Elements:** The custom (HTML) element definitions
    - **Primitives:** Some classes that some HTML elements are based on
    - **Tools:** Some little helper scripts
2. A minified version of that code, under **/dist** (including a [zip archive](https://git.gay/heydon/hyperblam/raw/branch/main/dist/hyperblam.zip)).
3. The **/api** documentation, explaining how to use everything (and prettified into the [elements pages]({{site.basedir}}/elements)).

![Diagram showing how the Hyperblam elements and the API docs arrive at this website. Hyperblam itself is used in the example pages and the API docs make up the elements pages.]({{site.basedircdn}}/static/images/illustrations/get-started2.svg)

## Installation

To start with, you need to do **4 things**:

1. Grab and unzip the [**HYPERBLAM** code](https://git.gay/heydon/hyperblam/raw/branch/main/dist/hyperblam.zip)  (or clone the [repository itself](https://git.gay/heydon/hyperblam))
2. Grab some [samples](https://github.com/Heydon/hyperblam-docs/tree/main/src/static/sounds)
3. Make a webpage (a file ending in `.html`)
4. Get that webpage running on a local server (try something like [Simple Web Server](https://simplewebserver.org/))
5. Point the webpage at the `hyperblam.js` file like so:

```html
    <!-- rest of the web page up here ↑ -->
    <script type="module" src="path/to/hyperblam.js"></script>
</body>
```

This `/hyperblam.js` script will look for **HYPERBLAM** elements in the page and bring them to life. Elements that aren’t used aren’t installed.

![A web page has some JavaScript injected into its foot and it explodes with loud sounds from its center.]({{site.basedircdn}}/static/images/illustrations/get-started1.svg)

<p class="u-note">
    <strong class="u-note__shout">All set!</strong> Now take a look at the <a href="/guides">other guides</a>—or head over to see some <a href="/examples">live examples</a> I’ve been messing around with.
</p>


