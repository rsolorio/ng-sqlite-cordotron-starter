import { Injectable } from '@angular/core';
import { FileServiceBase } from 'src/app/core/services/file/file.service.base';
import { EnvBrowserModule } from '../../env-browser.module';

@Injectable({
  providedIn: 'root'
})
export class FileBrowserService extends FileServiceBase {

  constructor() {
    super();
  }

  isSupported(): boolean {
    const x = EnvBrowserModule;
    return false;
  }

  getBuffer(filePath: string): null {
    return null;
  }

  getText(filePath: string): null {
    return null;
  }

  getFiles(directoryPath: string): null {
    return null;
  }

  getAbsolutePath(locationPath: string, endPath: string): null {
    return null;
  }

  getFileInfo(path: string): null {
    return null;
  }
}
