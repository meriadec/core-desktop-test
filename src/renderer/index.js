const { ipcRenderer } = require('electron')

ipcRenderer.send('libcore-get-version')
ipcRenderer.on('libcore-get-version-answer', (e, version) => {
  const div = document.createElement("div");
  div.innerHTML = version;
  document.body.append(div);
})

ipcRenderer.send('listen-device')
ipcRenderer.on('listen-device-answer', (e, isOk) => {
  const div = document.createElement("div");
  div.innerHTML = `listen device is ok: ${isOk}`;
  document.body.append(div);
})
