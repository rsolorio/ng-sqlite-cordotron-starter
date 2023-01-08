import { EnvBrowserModule } from "src/app/env-browser/env-browser.module";
import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  production: true,
  name: 'browser',
  envModule: EnvBrowserModule
};
