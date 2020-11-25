const qrcode = require("qrcode-terminal");

module.exports = async (url = "http://it200.cn/") => {
  qrcode.generate(url, { small: true });
};
