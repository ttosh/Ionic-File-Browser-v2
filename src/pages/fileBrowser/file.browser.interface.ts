export interface IUserDeviceDetail {
  AssetTag: string,
  DeviceCheckoutDateTime: string,
  DeviceStationID: number, 
  DeviceType: string,
  DeviceTypeID: number, 
  EmployeeNumber: number,
  SerialNumber: string,
  UserFirstName: string, 
  UserLastName: string, 
  UserStationID: number, 
  Result: string
}

export interface IDirectoryContents {
  currentEntries: any;
  backButtonDirEntry: any;
}

export interface IDeviceTypeFolderConfig {
  ConfigurationID: number,
  DeviceTypeID: number,
  DeviceStationID: number, 
  DeviceTypeName: string,
  FolderName: string, 
  FolderPin: string
}

export interface IProcessedRootEntries {
  deviceFolders: any;
  rootFolders: any;
  currentEntries: any;
  deviceTypeFolderConfigData: any;
  errorMessage: string;
}