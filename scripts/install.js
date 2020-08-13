const fs = require("fs");
const path = require("path");
const util = require("util");
const sub_app_path = path.join(__dirname, "../webapps");
const sub_apps = fs.readdirSync(sub_app_path);

console.log(
  `即将进入所有模块并下载依赖：${JSON.stringify(
    sub_apps
  )} ing... 批量下载所有项目依赖推荐使用 npm run cinit`
);

const exec = util.promisify(require("child_process").exec);

// npm 源
let registry = process.argv.length === 3 ? "cnpm install" : "npm install";

function install() {
  sub_apps.forEach(async subAppName => {
    console.log(`${subAppName} 开始下载依赖，耗时较久请耐心等待...`);
    const { stdout, stderr } = await exec(registry, {
      cwd: path.join(__dirname, "../webapps/" + subAppName)
    });
    console.log(subAppName, "success", stdout);
    console.error(subAppName, "error", stderr);
  });
}
install();

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});
