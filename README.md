# Angular Sqlite (TypeOrm) Cordova Electron

Boilerplate project that supports an Angular/Sqlite application running in Electron or Cordova.

## Instructions
- Clone the repo
- Install the global dependencies
- Install the tools
- Setup the environment variables
- Do an npm install
- If you are using cordova add the proper platform; before doing it create a www directory in the root of the project.

## Technologies & Tools
- Angular CLI 14
- NodeJS 18
- Android Studio Dolphin 2021.3.1 Patch 1
  - Android SDK 9.0 (Pie)
  - Android SDK Build Tools 30.0.3
- Cordova 11
- Gradle 7.6

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
- @angular-builders/custom-webpack
  - Allows to setup extra web pack configurations for Electron (to resolve node imports).
  - In the `angular.json` file, under the `architect` section, I added a new build section called `build-electron` which uses the custom webpack configuration. This section is also referenced in the `serve/configurations/electron` section.
  - A custom build target can be executed as follows: `ng run [project name]:[target name]:[configuration name]`
    - Example: `ng run ng-sqlite-cordotron-starter:build-electron:electron`

## Environment Variables (Cordova)
You need to setup these variables before running/building for cordova. You need to restart VS Code in order to get the new values.
- ANDROID_SDK_ROOT
  - C:\Users\rsolorio\AppData\Local\Android\Sdk
- JAVA_HOME
  - C:\Program Files\Android\Android Studio\jre
- PATH
  - C:\Gradle\gradle-7.6\bin

## NPM package scripts
- npm run serve:browser
  - Serves and runs the application in a browser window
  - Uses the default `development` build configuration
- npm run serve:electron
  - Serves and runs the application in electron, supporting auto refresh when files change
  - Uses a custom webpack configuration
- npm run dist:electron
  - Builds the app for electron, placing the file in the dist folder, a runs the application, retrieving the content from the dist folder
  - Uses a custom webpack configuration
  - Does not support auto refresh
- npm run build:windows
  - Builds the application for electron supporting Windows. Output folder: prod
- npm run build:android
  - Builds the application with cordova supporting Android

## Cordova Commands
- cordova run android
  - Creates the cordova build and launches the app in the emulator.
  - You need to have an emulator running.
- cordova build android --debug
  - Creates the apk file in debug mode which allows to be installed without a proper certificate
- cordova platform add android
  - Installs the cordova-android package and creates a platform android folder in the project
- cordova platform rm android
  - Un does the add command
  - Fixes an issue that starts happening after updating the config xml file: "No Java files found which extend CordovaActivity".

## Cordova Config File
Before running a cordova build update the config.xml to meet your needs. Make sure to update the required fields mentioned [here](https://cordova.apache.org/docs/en/11.x/config_ref/).

- widget id
- widget version
- name
- description
- author
- author email
- author href