import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';
import { FileOpener } from '@ionic-native/file-opener';

//import { IFileService } from "../../services/file.service";
import { IUserDeviceDetail, IDeviceTypeFolderConfig } from "./file.browser.interface";

import { DataService } from '../../services/data.service';
import { FileService } from '../../services/file.service';

declare let cordova: any;

@Component({
  selector: 'page-file-browser',
  templateUrl: 'file-browser.html',
  providers: [Device, File, FileOpener, DataService, FileService]
})
export class FileBrowserPage implements OnInit {
  
  deviceFolders: any;
  rootFolders: any;
  currentEntries: any;
  deviceTypeID: number;
  errorMessage: string;
  isListView: boolean;
  currentPinCode: string;
  backButtonDirEntry: any;
  deviceTypeFolderConfigData: IDeviceTypeFolderConfig[];

  constructor(public navCtrl: NavController, private file: File, private fileOpener: FileOpener, 
    private device: Device, private dataService: DataService, private fileService: FileService) {

      this.deviceFolders = [];
      this.rootFolders = [];
      this.currentEntries = [];
      this.deviceTypeID = 0;
      this.errorMessage = '';
      this.isListView = true;
      this.currentPinCode = '';
      this.backButtonDirEntry = {};
      this.deviceTypeFolderConfigData = new Array<IDeviceTypeFolderConfig>();
  }

  ngOnInit(): void {
    console.log(this.device.serial);
    this.dataService.getDeviceTypeDetails(this.device.serial).subscribe(data => this.processDeviceDetails(data));
  }

  processDeviceDetails(userDeviceDetailData: IUserDeviceDetail): void {
    this.dataService.getDeviceTypeFolderConfigurations(userDeviceDetailData.DeviceTypeID).subscribe(data => this.processDeviceTypefolders(data));
  }

  processDeviceTypefolders(deviceTypeFolderConfigData: IDeviceTypeFolderConfig[]): void {
    let self = this;
    self.deviceTypeFolderConfigData = deviceTypeFolderConfigData;
    self.fileService.getEntriesAtRoot().then(function (rootEntries: any) {
      self.processRootEntries(rootEntries);
    }), function (error) {
      this.processError(error);
    };
  }

  processRootEntries(rootEntries: any) {
    console.log('Processing Root Entries');
    let processedRootEntries = this.fileService.processRootEntries(rootEntries, this.deviceTypeFolderConfigData);
    console.log('Finished Processing Root Entries, Results:');
    console.log(processedRootEntries);


    this.rootFolders = processedRootEntries;
    this.currentEntries = processedRootEntries;
  }

  getDirectoryContents(dirEntry: any) {
    this.backButtonDirEntry = null;
    let directoryContents = this.fileService.getDirectoryContents(dirEntry, this.fileOpener);
    this.currentEntries = directoryContents.currentEntries;
    this.backButtonDirEntry = directoryContents.backButtonDirEntry;
  }

}
