import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FILE_SERVICE } from '../core/services/file/file.service.base';
import { FileBrowserService } from './services/file/file-browser.service';



@NgModule({
  providers: [
    { provide: FILE_SERVICE, useClass: FileBrowserService }
  ],
  imports: [
    CommonModule
  ]
})
export class EnvBrowserModule { }
