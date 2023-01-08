import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFileInfo } from 'src/app/core/services/file/file.interface';
import { FileServiceBase } from 'src/app/core/services/file/file.service.base';

@Injectable({
  providedIn: 'root'
})
export class FileCordovaService extends FileServiceBase {

  constructor() {
    super();
  }

  isSupported(): boolean {
    return true;
  }

  getBuffer(filePath: string): Promise<Buffer> | null {
    return null;
  }

  getText(filePath: string): Promise<string> | null {
    return null;
  }

  getFiles(directoryPath: string): Observable<IFileInfo> | null {
    return null;
  }

  getAbsolutePath(locationPath: string, endPath: string): string | null {
    return null;
  }

  getFileInfo(path: string): Promise<IFileInfo> | null {
    return null;
  }
}
