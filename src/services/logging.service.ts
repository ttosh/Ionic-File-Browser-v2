import { Injectable } from '@angular/core';

import { ILoggingService } from "./logging.service.interface";

@Injectable()
export class LoggingService implements ILoggingService {

  logMessageToConsole(message: string): void {
   
  }

  logMessageAndObjectToConsole(message: string, obj: object): void {
    
  }
  
  logMessageAndErrorToConsole(message: string, error): void {
    
  }

}