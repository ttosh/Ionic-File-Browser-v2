import { FileOpener } from '@ionic-native/file-opener';

export interface IFileService {
  compareDirEntryNames(a, b): number
  getEntriesAtRoot(): Promise<string>,
  getDirectoryContents(dirEntry: any, fileOpener: FileOpener) : any;
  processRootEntries(rootEntries: any, folderConfigEntries: any): void;
  getEntries(path: string): Promise<string>
  getParentDirectory(path: string): Promise<string>,
}
