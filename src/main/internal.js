const helpers = require("./helpers");
const fs = require("fs");
const path = require("path");

process.on("message", msgType => {
  if (msgType === "libcore-get-version") {
    helpers.libCoreGetVersion(v => {
      process.send({ msgType, value: v });
      try {
        console.log(`writing in ${path.resolve(process.env.USER_DATA_PATH_YOLO, "libcore-version")}`)
        fs.writeFileSync(path.resolve(process.env.USER_DATA_PATH_YOLO, "libcore-version"), v);
      } catch (err) {
        console.log(err)
      }
    });
  }
  if (msgType === "listen-device") {
    helpers.listenDevices(res => {
      process.send({ msgType, value: res });
      try {
        console.log(`writing in ${path.resolve(process.env.USER_DATA_PATH_YOLO, "listen-device")}`)
      fs.writeFileSync(path.resolve(process.env.USER_DATA_PATH_YOLO, "listen-device"), res);
      } catch (err) {
        console.log(err)
      }
    });
  }
});
