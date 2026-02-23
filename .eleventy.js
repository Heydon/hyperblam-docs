const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const waveforms = ['square', 'sine', 'sawtooth', 'triangle'];
const package = require('./static/hyperblam/package.json');
const api = require('./static/hyperblam/dist/api.json');

const icons = {};

icons.playStop = `
  <svg viewBox="0 0 32 32" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
    <path class="on" d="M10 8, 26 16, 10 24z"></path>
    <path class="off" d="M9 9, 23 9, 23 23, 9 23z"></path>
  </svg>
`;

icons.playPause = `
  <svg viewBox="0 0 32 32" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
    <path class="on" d="M10 8, 26 16, 10 24z"></path>
    <path class="off" d="M9 9, 13 9, 13 23, 9 23z M19 9, 23 9, 23 23, 19 23z"></path>
  </svg>
`;

icons.close = `<svg viewBox="0 0 32 32" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path transform-box="fill-box" transform-origin="center" transform="rotate(45)" d="M8 15, 24 15, 24 17, 8 17z"></path><path transform-box="fill-box" transform-origin="center" transform="rotate(-45)" d="M8 15, 24 15, 24 17, 8 17z"></path></svg>`;

const random = {
  oneOf(array) {
    array = array || [0];
    return array[Math.floor(Math.random() * array.length)];
  },
  chance(fraction) {
    return Math.random() <= fraction;
  },
  floatBetween(min, max) {
    min = min > max ? max : min;
    max = max < min ? min : max;
    return (Math.random() * (max - min) + min);
  },
  integerBetween(min, max) {
    min = min > max ? max : min;
    max = max < min ? min : max;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = async function(eleventyConfig) {
  eleventyConfig.addGlobalData('package', package);
  eleventyConfig.addGlobalData('api', api);

  const { RenderPlugin } = await import('@11ty/eleventy');
  eleventyConfig.addPlugin(RenderPlugin);

  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addFilter('md', content => {
    return content ? md.render(content) : '';
  });

  eleventyConfig.addFilter('lowercase', content => {
    return content.toLowerCase();
  });

  eleventyConfig.addShortcode('icon', function(name) {
    return icons[name];
  });

  // Put all static assets here
  eleventyConfig.addPassthroughCopy('./static');

  // Log any nunjucks
  eleventyConfig.addFilter('log', value => {
    console.log(value);
  });

  // Link the subheadings 
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: false
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Table of contents filter
  eleventyConfig.addFilter('toc', function (value) {
    const items = [];
    let dom = new JSDOM(value);
    let document = dom.window.document;
    const headings = document.querySelectorAll('h2:not([data-no-toc])');
    if (headings.length > 0) {
      headings.forEach(function (h) {
        items.push(`<li><a href="#${h.id}">${h.textContent}</a></li>`);
      });
      return `
        <nav class="docs-toc" aria-labelledby="toc-title">
          <span aria-hidden="true" id="toc-title">table of contents</span>
          <ul>
            ${items.join('')}
          </ul>
        </nav>
      `;
    }
    return null;
  });

  eleventyConfig.addTransform('all', (content, outputPath) => {
    if (!outputPath.endsWith('.html')) {
      return content;
    }

    const dom = new JSDOM(content);
    const document = dom.window.document;

    // random divider waveforms
    const dividers = [...document.querySelectorAll('hr')];
    dividers.forEach(d => {
      d.classList.add(`u-wave-${random.oneOf(waveforms)}`);
    });

    // lazy load images
    const images = [...document.querySelectorAll('main img')];
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    })

    return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  }
};