# Angular Sqlite (TypeOrm) Cordova Electron

Boilerplate project that supports an Angular/Sqlite application running in Electron or Cordova.

## Technologies & Tools
- Angular CLI 14
- NodeJS 18
- Android Studio Dolphin 2021.3.1 Patch 1
  - Which provides the Android SDK 9.0 (Pie)
- Cordova 11

## NPM package scripts
- npm run serve:browser
  - Serves and runs the application in a browser window
- npm run serve:electron
  - Serves and runs the application in electron, supporting auto refresh when files change
- npm run dist:electron
  - Runs the application in electron, retrieving the content from the dist folder
- npm run build:windows
  - Builds the application for electron supporting Windows. Output folder: prod

## Global Dependencies
- @angular/cli@14
- cordova@11

## Dev Dependencies
- electron-reload
  - Used in the main electron script to reload electron and react to changes.
- wait-on
  - Used in the script that serves electron from localhost; it waits for the default url to be loaded before preparing the main electron script.
- npm-run-all
  - To run scripts in parallel. In this case used to run the ng serve and the electron preparation at the same time.
- electron-builder
  - Used to generate the build for windows or mac.