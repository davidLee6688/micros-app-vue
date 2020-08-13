const fs = require("fs");
const path = require("path");
const util = require("util");
const sub_app_path = path.join(__dirname, "../webapps");
const sub_apps = fs.readdirSync(sub_app_path);

console.log(`即将进入所有模块并启动服务：${JSON.stringify(sub_apps)} ing...`);

const exec = util.promisify(require("child_process").exec);
function start() {
  sub_apps.forEach(async subAppName => {
    console.log(
      `${subAppName} 开始启动... 全部启动需要时间，请稍加等候，或刷新浏览器即可`
    );
    const { stdout, stderr } = await exec("npm run serve", {
      cwd: path.join(__dirname, "../webapps/" + subAppName)
    });
    console.log(subAppName, "success", stdout);
    console.error(subAppName, "error", stderr);
  });
}
start();

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});
