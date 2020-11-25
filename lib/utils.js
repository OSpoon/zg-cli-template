const ora = require("ora");
const chalk = require("chalk");

const loading = (fn, message) => async (...args) => {
  const spinner = ora(chalk.green(message));
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};

const log = (content) => console.log(chalk.green(content));

const error = (content) => console.error(chalk.red(content));

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  const options = args[args.length - 1];
  if (process.platform === "win32") {
    // 设置 shell 选项为 true 以隐式地调用 cmd
    options.shell = true;
  } else {
    // nothing
  }

  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  loading,
  log,
  error,
  spawn,
};
