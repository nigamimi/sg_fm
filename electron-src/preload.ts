/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { contextBridge, ipcRenderer } from "electron";

export const apiKeyName = "electronMain" as const;
export const methods = {
  send: (message: string) => {
    ipcRenderer.send("message", message);
  },
  listen: (listener: (...args: any[]) => void) => {
    ipcRenderer.addListener("message", listener);
  },
} as const;
contextBridge.exposeInMainWorld(apiKeyName, methods);
