const helpers = require("./helpers");

process.on("message", msgType => {
  if (msgType === "libcore-get-version") {
    helpers.libCoreGetVersion(v => {
      process.send({ msgType, value: v });
    });
  }
  if (msgType === "listen-device") {
    helpers.listenDevices(res => {
      process.send({ msgType, value: res });
    });
  }
});
