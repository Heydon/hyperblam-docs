const jetpack = require('fs-jetpack');

const exampleData = [];
const dataFiles = jetpack.find('./examples/', { matching: ['*.json'] });
dataFiles.forEach(file => {
  exampleData.push(jetpack.read(file, 'json'));
});
exampleData.sort((a, b) => a.order - b.order);

module.exports = {
  title: 'HYPERBLAM',
  basedir: process.env.CONTEXT === 'pages' ? 'https://hyperblam.how' : '',
  hyperblampath: process.env.CONTEXT === 'pages' ? 'static/hyperblam/dist/hyperblam/hyperblam.js' : 'static/hyperblam/src/hyperblam.js',
  categories: {
    Sequencing: 'Elements involved in scheduling sounds and other events, creating phrases, loops, compositions.',
    Sampling: 'Elements used for creating and playing sound sources.',
    Modulating: 'Elements that make gradual changes to parameters over time.',
    Processing: 'Elements involved in affecting the character of sounds. Effects, essentially.',
    Controlling: 'Elements for triggering functions, changing props and parameters, and handling MIDI.',
    Automating: 'Elements for changing and randomizing props and parameters automatically (according to events).',
    Visualizing: 'Elements involved in rendering sound and state data in some way.'
  },
  exampleData
}