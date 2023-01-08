import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FILE_SERVICE } from '../core/services/file/file.service.base';
import { FileCordovaService } from './services/file/file-cordova.service';



@NgModule({
  providers: [
    { provide: FILE_SERVICE, useClass: FileCordovaService }
  ],
  imports: [
    CommonModule
  ]
})
export class EnvCordovaModule { }
