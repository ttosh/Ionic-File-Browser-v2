import { Injectable } from '@angular/core';

import { FileOpener } from '@ionic-native/file-opener';
import { IFileService } from "../services/file.service.interface";
import { IDirectoryContents, IProcessedRootEntries } from "../pages/fileBrowser/file.browser.interface";

declare let cordova: any;

@Injectable()
export class FileService implements IFileService {

getParentDirectory(path: string): Promise<string> {
    return new Promise(resolve => {
      (<any>window).resolveLocalFileSystemURL(path, function (fileSystem) {
        fileSystem.getParent(function (result) {
          resolve(result);
        }, function (error) {
          throw error;
        });
      }, function (error) {
        throw error;
      });
    });
  }

  getEntriesAtRoot(): Promise<string> {
    return new Promise(resolve => {
      (<any>window).resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (fileSystem) {
        var directoryReader = fileSystem.createReader();
        directoryReader.readEntries(function (entries) {
          resolve(entries);
        }, function (error) {
          throw error;
        });
      }, function (error) {
        throw error;
      });
    });
  }

  getEntries(path: string): Promise<string> {
    return new Promise(resolve => {
      (<any>window).resolveLocalFileSystemURL(path, function (fileSystem) {
        var directoryReader = fileSystem.createReader();
        directoryReader.readEntries(function (entries) {
          var regEx = /(?:\.([^.]+))?$/;
          for (let i = 0; i < entries.length; i++) {
            if (entries[i].isFile) {
              entries[i].extension = regEx.exec(entries[i].fullPath);
              entries[i].isBackButton = false;
            }
          }
          resolve(entries);
        }, function (error) {
          throw error;
        });
      }, function (error) {
        throw error;
      });
    });
  }

  getDirectoryContents(dirEntry: any, fileOpener: FileOpener) : IDirectoryContents {

    if (dirEntry.isBackButton) {
      //$scope.noFilesInCurrentSelectedFolder = false;
    }

    if (!dirEntry.isBackButton && dirEntry.isFile) {
      fileOpener.open(decodeURIComponent(dirEntry.toURL()), 'application/'+dirEntry.extension[0])
      .then(() => console.log('File Open Success!'))
      .catch(e => console.log('File Open Error: ', e));
      return;
    }

    // if (dirEntry.fullPath === "/") {
    //   FileBrowserPage.backButtonDirEntry = null;
    //   FileBrowserPage.currentEntries = FileBrowserPage.rootFolders;
    // } else {
    //   if (!dirEntry.isBackButton) { //&& fileSecurity.hasFolderSecurityTimeoutExceeded(dirEntry)) {
    //     FileBrowserPage.currentPinCode = '';
    //     //$scope.dirEntry = dirEntry;
    //     //$ionicModal.fromTemplateUrl('templates/pinCode.html', function (modal) {
    //     // $scope.modal = modal;
    //     // $scope.modal.show();
    //     //}, {
    //     //   scope: $scope,
    //     //   animation: 'slide-in-up'
    //     // });
    //   } else {

        let directoryContents = {
          currentEntries: {},
          backButtonDirEntry: null,
        };

        this.getEntries(dirEntry.nativeURL).then(function (entryResult: any) {
          console.log(entryResult);
          //result.length === 0 ? $scope.noFilesInCurrentSelectedFolder = true : $scope.noFilesInCurrentSelectedFolder = false;
          
          directoryContents.currentEntries = entryResult;
          //self.currentEntries = entryResult;
          //self.backButtonDirEntry = null;
          this.fileService.getParentDirectory(dirEntry.nativeURL).then(function(pdResult: any) {
            pdResult.isBackButton = true;
            directoryContents.backButtonDirEntry = pdResult;
            //self.backButtonDirEntry = pdResult;
          });
        });
     // }
    //}

    return directoryContents;

  }

  processRootEntries(rootEntries: any, folderConfigEntries: any) : any {
    let processedEntries = [];
    for (let rootKey in rootEntries) {
      for (let dirKey in folderConfigEntries) {
        if (rootEntries[rootKey].name === folderConfigEntries[dirKey].FolderName) {
          rootEntries[rootKey].ConfigurationID = folderConfigEntries[dirKey].ConfigurationID;
          rootEntries[rootKey].DeviceTypeID = folderConfigEntries[dirKey].DeviceTypeID;
          rootEntries[rootKey].DeviceTypeName = folderConfigEntries[dirKey].DeviceTypeName;
          rootEntries[rootKey].FolderName = folderConfigEntries[dirKey].FolderName;
          rootEntries[rootKey].FolderPin = folderConfigEntries[dirKey].FolderPin;
          rootEntries[rootKey].FolderPin = folderConfigEntries[dirKey].FolderPin;
          rootEntries[rootKey].FolderPin = folderConfigEntries[dirKey].FolderPin;
          processedEntries.push(rootEntries[rootKey]);
          break;
        }
      }
    }
    return folderConfigEntries.length === 0 ?  rootEntries :  processedEntries;
  }
  
  compareDirEntryNames(a, b): number {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

}