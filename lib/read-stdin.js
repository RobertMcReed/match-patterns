'use strict';

process.stdin.setEncoding('utf8');

module.exports = () => new Promise((resolve, reject) => {
  let data = '';
  
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk) data += chunk;
  });
  
  process.stdin.on('end', () => {
    resolve(data);
  });

  process.stdin.on('error', reject);
});
