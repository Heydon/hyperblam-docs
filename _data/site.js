module.exports = {
  title: 'HYPERBLAM',
  basedir: process.env.CONTEXT === 'pages' ? 'https://heydon.github.io/hyperblam-docs' : '',
  hyperblampath: 'static/hyperblam/src/hyperblam.js',
  categories: {
    Sequencing: 'Elements involved in scheduling sounds and other events, creating phrases, loops, compositions.',
    Sampling: 'Elements used for creating and playing sounds as buffers.',
    Modulating: 'Elements that make gradual changes to parameters over time.',
    Processing: 'Elements involved in affecting the character of sounds. Effects, essentially.',
    Controlling: 'Interface elements for triggering functions, changing props and parameters, handling MIDI, and displaying values.',
    Automating: 'Elements for changing and randomizing props and parameters automatically (according to events).',
    Visualizing: 'Elements involved in rendering sound and state data in some way.'
  }
}