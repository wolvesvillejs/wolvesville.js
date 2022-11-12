const fs = require('fs');

const dir = fs.readdirSync('../src', { withFileTypes: true })
  .filter(item => item.isDirectory() && item.name !== 'rest')
  .map(folder => folder.name);

const exported = dir.map(item => {
  const files = fs.readdirSync('../src/' + item);
  return files.map(file => {
    return `exports.${file.slice(0, -3)} = require('./${item}/${file.slice(0, -3)}');`
  }).join('\n');
}).join('\n\n');

fs.writeFileSync('../src/index.js', 
  `'use strict';\n\n${exported}`
);