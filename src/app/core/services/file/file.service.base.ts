import { Observable } from 'rxjs';
import { IFileInfo } from './file.interface';

export const FILE_SERVICE = 'FileService';

export abstract class FileServiceBase {

  constructor() { }

  abstract isSupported(): boolean;

  abstract getBuffer(filePath: string): Promise<Buffer> | null;

  abstract getFiles(directoryPath: string): Observable<IFileInfo> | null;

  abstract getText(filePath: string): Promise<string> | null;

  abstract getAbsolutePath(locationPath: string, endPath: string): string | null;

  abstract getFileInfo(path: string): Promise<IFileInfo> | null;

  removeBom(value: string): string {
    // 0xFEFF = 65279
    if (value && value.charCodeAt(0) === 0xFEFF) {
      return value.substring(1);
    }
    return value;
  }
}