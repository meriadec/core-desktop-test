const helpers = require("./src/main/helpers");

helpers.libCoreGetVersion(res => {
  console.log(`libCoreGetVersion ${res}`)
})

helpers.listenDevices(res => {
  console.log(`listenDevices ${res}`)
})

setTimeout(() => {
  process.exit(0)
  console.log(`quitting`)
}, 3e3)
