// Native
import events from "events";
import path from "path";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import electronIsDev from "electron-is-dev";
import prepareNext from "electron-next";

const main = async () => {
  // Prepare the renderer once the app is ready
  await events.once(app, "ready");
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Alwasys use safer option.
      // If you would not roll back to older Electron, you would not need these line.

      // Default: true from v12. Deprecated from v10. Introduced in v10.
      worldSafeExecuteJavaScript: true,
      // Default: false from v5
      nodeIntegration: false,
      // Default: false from v11
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const url = electronIsDev
    ? "http://localhost:8000/"
    : new URL(path.resolve(__dirname, "../renderer/out/index.html"), "file://")
        .href;

  mainWindow.loadURL(url);
};

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});

/*!*************************************************************************************************
                                                MAIN
***************************************************************************************************/

main();
