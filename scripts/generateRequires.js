const fs = require('fs');

const dir = fs.readdirSync('../src', { withFileTypes: true })
  .filter(item => item.isDirectory() && item.name !== 'rest')
  .map(folder => folder.name);

const exported = dir.map(item => {
  const files = fs.readdirSync(`../src/${item}`);
  return files.map(file => {
    var line = `exports.${file.slice(0, -3)} = require('./${item}/${file.slice(0, -3)}');`;
    if(file === 'Constants.js') {
      Object.keys(require(`../src/${item}/${file}`)).forEach(constant => {
        line += `\nexports.${constant} = require('./${item}/${file.slice(0, -3)}').${constant};`;
      });
      line += '\n'
    }
    return line
  }).join('\n');
}).join('\n\n');

fs.writeFileSync('../src/index.js', 
  `'use strict';\n\n${exported}`
);