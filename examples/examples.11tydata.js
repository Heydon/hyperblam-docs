module.exports = {
  tags: 'examples',
  permalink: process.env.CONTEXT === 'pages' ? 'https://heydon.github.io/hyperblam/experiments/{{page.fileSlug}}/index.html' : '/examples/{{page.fileSlug}}/index.html',
  visualiser: {
    count: 16,
    first: undefined,
    last: undefined 
  }
}