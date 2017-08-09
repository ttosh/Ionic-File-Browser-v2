import { Injectable } from '@angular/core';

import { ISecurityService } from "./security.service.interface";

@Injectable()
export class SecurityService implements ISecurityService {
  setPinForTimeoutInLocalStorage(dirEntry: any): void {
  
  }

  hasFolderSecurityTimeoutExceeded(dirEntry: any): boolean {
    return null;
  }

}