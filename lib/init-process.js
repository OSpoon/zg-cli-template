const { promisify } = require("util");
const clear = require("clear");
const figlet = promisify(require("figlet"));
const { loading, log, spawn } = require("./utils");

/* 欢迎提示 */
module.exports.welcome = async function (name, content) {
  log(`> 创建项目：${name}`);
  clear();
  const data = await figlet(content);
  log(data);
};

/* 下载模板项目 */
module.exports.clone = async function (repo, desc) {
  const download = promisify(require("download-git-repo"));
  await require("./utils").loading(download, `${repo}模板下载中`)(repo, desc);
};

/* 安装项目依赖 */
module.exports.install = async function (name) {
  // 安装依赖
  await loading(spawn, "> 安装依赖")("npm", ["install"], {
    cwd: `./${name}`,
  });
  log(
    `
    > 安装完成：
    To get Start:
    ===========================
      cd ${name}
      npm run serve
    ===========================`
  );
};

/* 启动服务 */
module.exports.open = async function (name) {
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
