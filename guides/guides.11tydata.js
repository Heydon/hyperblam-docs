module.exports = {
  layout: 'layouts/guide.njk',
  tags: 'guides',
  permalink: process.env.CONTEXT === 'pages' ? 'https://heydon.github.io/hyperblam/guides/{{page.fileSlug}}/index.html' : '/guides/{{page.fileSlug}}/index.html'
}