const CommNodeHid = require("@ledgerhq/hw-transport-node-hid").default;
const lib = require("@ledgerhq/ledger-core");

exports.libCoreGetVersion = cb => {
  try {
    setTimeout(() => {
      const core = new lib.NJSLedgerCore();
      const stringVersion = core.getStringVersion();
      cb(stringVersion);
    }, 1 * 1000);
  } catch (err) {
    cb(err.stack);
  }
};

exports.listenDevices = cb => {
  try {
    const DURATION = 1 * 1000;

    CommNodeHid.listen({
      next: () => {},
      complete: () => {},
      error: err => {
        console.log(err);
        process.exit(1);
      }
    });

    setTimeout(() => {
      cb("ok");
    }, 1 * 1000);
  } catch (err) {
    cb(err.stack);
  }
};
