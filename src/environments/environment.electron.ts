import { EnvElectronModule } from "src/app/env-electron/env-electron.module";
import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  production: true,
  name: 'electron',
  envModule: EnvElectronModule
};
