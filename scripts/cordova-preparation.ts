// Line below needed to prevent errors with certain types like Promise, Buffer, process, etc.
/// <reference types="node" />

import * as fs from 'fs';

const sourceFolder = 'dist\\ng-sqlite-cordotron-starter';
const destinationFolder = 'www';

(async () => {
  try {
    main();
  } catch (err) {
    console.log(err);
  }
})();

function main(): void {
  moveFiles();
  updateIndex();
}

function moveFiles(): void {
  // Delete existing www folder
  if (fs.existsSync(destinationFolder)) {
    fs.rmSync(destinationFolder, { recursive: true, force: true });
  }
  // Create the www folder
  fs.mkdirSync(destinationFolder);

  // Copy contents from dist folder
  if (fs.existsSync(sourceFolder)) {
    fs.cpSync(sourceFolder, destinationFolder, { recursive: true });
  }
}

function updateIndex(): void {
  const indexPath = destinationFolder + '\\index.html';
  const indexContent = fs.readFileSync(indexPath, { encoding: 'utf8' });
  const scriptTag = '<script src="cordova.js"></script>';
  const placeholder = `<!-- ${scriptTag} -->`;
  const newIndexContent = indexContent.replace(placeholder, scriptTag);
  fs.writeFileSync(indexPath, newIndexContent, { flag: 'w' });
}