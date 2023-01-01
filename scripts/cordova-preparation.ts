// Line below needed to prevent errors with certain types like Promise, Buffer, process, etc.
/// <reference types="node" />

import * as fs from 'fs';

const sourceFolder = 'dist\\ng-sqlite-cordotron-starter';
const destinationFolder = 'www';

(async () => {
  try {
    await main();
  } catch (err) {
    console.log(err);
  }
})();

async function main(): Promise<void> {
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