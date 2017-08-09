export interface ILoggingService {
  logMessageToConsole(message: string): void;
  logMessageAndObjectToConsole(message: string, obj: object): void;
  logMessageAndErrorToConsole(message: string, error): void;
}