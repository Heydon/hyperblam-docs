import { minify_sync } from 'terser';
import fs from 'fs-jetpack';

const files = fs.find('./dist/hyperblam/', { matching: '*.js' });

files.forEach(file => {
  const minified = minify_sync(fs.read(file), { module: true, mangle: false });
  fs.write(file, minified.code);
});


