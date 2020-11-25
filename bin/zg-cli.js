#!/usr/bin/env node
const program = require("commander");
const updateNotifier = require("update-notifier");
const path = require("path");
const pkg = require("../package.json");

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60,
});

if (notifier.update) {
  console.log(`有可更新版本: ${notifier.update.latest},建议更新后使用`);
}

program.version(pkg.version, "-v, --version").parse(process.argv);

// 命令合集
const mapAction = {
  init: {
    alias: "",
    examples: ["zg initialize <name>"],
    description: "initialize the project",
  },
};

// 处理命令
Reflect.ownKeys(mapAction).forEach((action) => {
  program
    .command(action)
    .alias(mapAction[action].alias)
    .description(mapAction[action].description)
    .action(() => {
      require(path.resolve(__dirname, `../lib/${action}`))(
        ...process.argv.slice(3)
      );
    });
});

program.parse(process.argv);
