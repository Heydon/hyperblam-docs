const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function(eleventyConfig) {
  // Put all static assets here
  eleventyConfig.addPassthroughCopy('./static');

  // Log any nunjucks
  eleventyConfig.addFilter('log', value => {
    console.log(value)
  });

  // Example of using dynamic data
  // (could be fetched/compiled from files or API)
  eleventyConfig.addGlobalData('pages', [
    {
      "title": "Page 2 title",
      "name": "Snugglepants",
      "age": 5
    },
    {
      "title": "Page 3 title",
      "name": "Lord Featherbottom",
      "age": 4
    },
    {
      "title": "Page 4 title",
      "name": "Pennywise",
      "age": 9
    }
  ]);

  // Link the subheadings 
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: false
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

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
          <span hidden id="toc-title">table of contents</span>
          <ul>
            ${items.join('')}
          </ul>
        </nav>
      `;
    }
    return null;
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  }
};