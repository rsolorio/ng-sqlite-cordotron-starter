import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { promises } from 'fs';
import { join, resolve, extname } from 'path';
import { FileServiceBase } from 'src/app/core/services/file/file.service.base';
import { IFileInfo } from 'src/app/core/services/file/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FileElectronService extends FileServiceBase {

  constructor() {
    super();
  }

  isSupported(): boolean {
    return true;
  }

  getBuffer(filePath: string): Promise<Buffer> {
    return promises.readFile(filePath);
  }

  getText(filePath: string): Promise<string> {
    return promises.readFile(filePath, { encoding: 'utf8' }).then(data => {
      return this.removeBom(data.toString());
    });
  }

  getFiles(directoryPath: string): Observable<IFileInfo> {
    const result = new Observable<IFileInfo>(observer => {
      this.pushFiles(directoryPath, observer).then(() => {
        observer.complete();
      });
    });
    return result;
  }

  private async pushFiles(directoryPath: string, observer: Subscriber<IFileInfo>): Promise<void> {
    const items = await this.getDirItems(directoryPath);
    for (const item of items) {
      const itemPath = join(directoryPath, item);
      const fileInfo = await this.getFileInfo(itemPath);
      if (fileInfo.isDirectory) {
        await this.pushFiles(itemPath, observer);
      }
      else {
        observer.next(fileInfo);
      }
    }
  }

  private getDirItems(directoryPath: string): Promise<string[]> {
    return promises.readdir(directoryPath);
  }

  public getFileInfo(path: string): Promise<IFileInfo> {
    return promises.stat(path).then (fileStat => {
      const info: IFileInfo = {
        isDirectory: fileStat.isDirectory(),
        path,
        parts: path.split('\\').reverse(),
        size: fileStat.size,
        addDate: fileStat.atime,
        changeDate: fileStat.mtime
      };
      info.fullName = info.parts[0];
      if (info.isDirectory) {
        info.name = info.fullName;
        info.directoryPath = info.path;
      }
      else {
        const extensionSeparatorIndex = info.fullName.lastIndexOf('.');
        if (extensionSeparatorIndex > 0) {
          info.name = info.fullName.substring(0, extensionSeparatorIndex);
        }
        else {
          info.name = info.fullName;
        }
        info.directoryPath = info.path.replace(info.parts[0], '');
        info.extension = extname(info.path);
      }
      return info;
    });
  }

  getAbsolutePath(locationPath: string, endPath: string): string {
    return resolve(locationPath, endPath);
  }
}
