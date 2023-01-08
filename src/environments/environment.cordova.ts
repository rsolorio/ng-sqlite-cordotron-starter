import { EnvCordovaModule } from "src/app/env-cordova/env-cordova.module";
import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  production: true,
  name: 'cordova',
  envModule: EnvCordovaModule
};
