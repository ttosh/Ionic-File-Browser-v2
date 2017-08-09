import { Observable } from 'rxjs/Observable';
import { IUserDeviceDetail, IDeviceTypeFolderConfig } from "../pages/fileBrowser/file.browser.interface";

export interface IDataService {
  handleError(error),
  getDeviceTypeDetails(serial: string): Observable<IUserDeviceDetail>,
  getDeviceTypeFolderConfigurations(deviceTypeId: number): Observable<IDeviceTypeFolderConfig[]>
}



