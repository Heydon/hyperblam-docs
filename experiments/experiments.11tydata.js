module.exports = {
  tags: 'experiments',
  permalink: process.env.CONTEXT === 'pages' ? 'https://heydon.github.io/hyperblam/experiments/{{page.fileSlug}}/index.html' : '/experiments/{{page.fileSlug}}/index.html'
}