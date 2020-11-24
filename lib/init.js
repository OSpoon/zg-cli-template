const { welcome, clone, install, open } = require("./init-process");

module.exports = async (name) => {
  // 1. 清空控制台,输出欢迎语
  await welcome(name, "ZG-Welcome");

  // 2. 创建项目
  await clone(require("../package.json").downloadRepoConfig.url, name);

  // 3. 安装依赖
  await install(name);

  // 4. 打开游览器,并启动项目
  await open(name);
};
