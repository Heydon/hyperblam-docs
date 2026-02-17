import jetpack from 'fs-jetpack';
import child_process from 'child_process';
const exec = child_process.exec;

const convert = () => {
  const wavFiles = jetpack.find('.', { matching: '*.wav' });
  wavFiles.forEach(wav => {
    console.log(wav);
    let webm = wav.replace('wav', 'mp3');
    exec(`ffmpeg -i ${wav} ${webm}`);
  });
}

convert();