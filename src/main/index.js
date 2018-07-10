"use strict";

import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import { fork } from "child_process";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow();

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});

const forkPath = path.resolve(__dirname, "internal.js");
const internalProcess = fork(forkPath);

let sender;

internalProcess.on("message", ({ msgType, value }) => {
  if (!sender) {
    console.log(`no sender`);
    return;
  }
  console.log(`sending ${value}`);
  sender.send(`${msgType}-answer`, value);
});

ipcMain.on("libcore-get-version", event => {
  sender = event.sender;
  internalProcess.send("libcore-get-version");
});

ipcMain.on("listen-device", event => {
  sender = event.sender;
  internalProcess.send("listen-device");
});
