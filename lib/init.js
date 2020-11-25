const Inquirer = require("inquirer");
const { welcome, clone, install, open } = require("./init-process");

module.exports = async (name) => {
  try {
    // 1. 清空控制台,输出欢迎语
    await welcome(name, "ZG-Welcome");

    //命令行交互
    const { repo } = await Inquirer.prompt({
      type: "input",
      message: "请输入Github仓库地址:",
      name: "repo",
      default: require("../package.json").downloadRepoConfig.url,
    });

    // 2. 创建项目
    await clone(repo, name);

    // 3. 安装依赖
    await install(name);

    // 4. 打开游览器,并启动项目
    await open(name);
  } catch (error) {
    throw error;
  }
};
