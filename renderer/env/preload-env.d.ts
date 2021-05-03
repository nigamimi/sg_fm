import type { apiKeyName, methods } from "../../electron-src/preload";

declare global {
  interface Window {
    [apiKeyName]: typeof methods;
  }
}
