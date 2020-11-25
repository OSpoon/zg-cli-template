const fs = require("fs");
const Inquirer = require("inquirer");
const path = require("path");
const compressing = require("compressing");

const { log, error } = require("./utils");

function getFromPath(fromPath) {
  let _fromPath = "";
  if (path.isAbsolute(fromPath)) {
    _fromPath = fromPath;
  } else {
    if (fromPath === "./") {
      _fromPath = path.resolve("./");
    } else {
      _fromPath = path.resolve(path.resolve("./"), fromPath);
    }
  }
  return _fromPath;
}

module.exports = async () => {
  try {
    const { fromPath } = await Inquirer.prompt({
      type: "input",
      message: "from path:",
      name: "fromPath",
      default: "./",
    });
    const rootPath = getFromPath(fromPath);
    console.log(">>>", rootPath);
    if (fs.existsSync(rootPath)) {
      const dirname = path.dirname(rootPath);
      const basename = path.basename(rootPath);
      const toPath = `${dirname}/${basename}.zip`;
      console.log("....:", toPath);
      console.log(path.resolve(path.basename(toPath)));
      //压缩
      compressing.zip
        .compressDir(rootPath, toPath)
        .then(() => {
          log(`压缩完成: ${path.basename(toPath)}`);
        })
        .catch((err) => {
          error(`压缩失败: ${path.basename(toPath)}`);
          error(err);
        });
    } else {
      log("路径不存在");
    }
  } catch (error) {
    throw error;
  }
};
