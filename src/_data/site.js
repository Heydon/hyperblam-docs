const jetpack = require('fs-jetpack');

const exampleData = [];
const dataFiles = jetpack.find('./src/examples/', { matching: ['*.json'] });
dataFiles.forEach(file => {
  exampleData.push(jetpack.read(file, 'json'));
});
exampleData.sort((a, b) => a.order - b.order);

module.exports = {
  title: 'HYPERBLAM',
  basedir: process.env.CONTEXT === 'pages' ? 'https://hyperblam.how' : '',
  hyperblampath: process.env.CONTEXT === 'pages' ? 'static/hyperblam/dist/hyperblam/hyperblam.js' : 'static/hyperblam/src/hyperblam.js',
  basedircdn: process.env.CONTEXT === 'pages' ? 'https://cdn.jsdelivr.net/gh/Heydon/hyperblam-docs@main/src' : '',
  categories: {
    Sequencing: 'Elements involved in scheduling sounds and other events, creating phrases, loops, compositions.',
    Sampling: 'Elements used for creating and playing sound sources.',
    Modulating: 'Elements that make gradual changes to parameters over time.',
    Processing: 'Elements involved in affecting the character of sounds. Effects, essentially.',
    Controlling: 'Elements for triggering functions, changing props and parameters, and handling MIDI.',
    Automating: 'Elements for changing and randomizing props and parameters automatically (according to events).',
    Visualizing: 'Elements involved in rendering sound and state data in some way.'
  },
  cardAlts: {
    1: 'Drawing of some JavaScript entering some HTML and making it go blam blam.',
    2: 'Labeled diagram of a waveform, showing peaks, troughs, and wavelength.',
    3: 'Slogan reading ‘write music, not JavaScript’',
    4: 'Cartoon demonstrating how a wah wah pedal works, moving the position of a frequency band.'

  },
  exampleData
}