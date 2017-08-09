export interface ISecurityService {
  setPinForTimeoutInLocalStorage(dirEntry): void;
  hasFolderSecurityTimeoutExceeded(dirEntry): boolean;
}