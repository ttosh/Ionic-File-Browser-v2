import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { IDataService } from "./data.service.interface";
import { IUserDeviceDetail, IDeviceTypeFolderConfig } from "../pages/fileBrowser/file.browser.interface";

@Injectable()
export class DataService implements IDataService {

  // LAB = 'https://newaamaintweblab.qcorpaa.aa.com/open/services/mmx/1.5/'
  // PROD = 'https://aamaintweb.aa.com/open/services/mmx/1.5/'

  private baseUrl: string = 'https://aamaintweb.aa.com/open/services/mmx/1.5/';
  private mmxCheckoutWebServiceUrl: string = 'MmxCheckoutWebservice/GetUserDeviceInfo?serialNumber=';
  private mmxFileBrowserConfigWebServiceUrl: string = 'MmxFileBrowserConfigWebService/GetFileBrowserConfigurationsByDeviceType?deviceType=';

  constructor(private http: Http) {
    
  }
  
  getDeviceTypeDetails(serial: string): Observable<IUserDeviceDetail> {
    return this.http.get(this.baseUrl +
      this.mmxCheckoutWebServiceUrl + serial)
      .map((response: Response) => <IUserDeviceDetail>response.json())
      .catch(this.handleError);
  }

  getDeviceTypeFolderConfigurations(deviceTypeId: number): Observable<IDeviceTypeFolderConfig[]> {
    return this.http.get(this.baseUrl +
      this.mmxFileBrowserConfigWebServiceUrl + deviceTypeId)
      .map((response: Response) => <IDeviceTypeFolderConfig[]>response.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.log(error);
    return Observable.throw(error.json().error || 'Data Service Error');
  }
}