import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FILE_SERVICE } from '../core/services/file/file.service.base';
import { FileElectronService } from './services/file/file-electron.service';



@NgModule({
  providers: [
    { provide: FILE_SERVICE, useClass: FileElectronService }
  ],
  imports: [
    CommonModule
  ]
})
export class EnvElectronModule { }
